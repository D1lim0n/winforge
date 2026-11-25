// Обновляет версии приложений в app.js по последним релизам GitHub.
// node tools/update-versions.mjs [--dry]
// GITHUB_TOKEN необязателен: без него лимит 60 запросов в час.

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const FILE = fileURLToPath(new URL("../app.js", import.meta.url));
const DRY = process.argv.includes("--dry");
const API = "https://api.github.com";
const headers = { "User-Agent": "winforge-updater", Accept: "application/vnd.github+json" };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

// win: { url: rel("owner/repo", "v1.0", "file.exe"), file: "file.exe" }
const REL = /(win|mac): \{ url: rel\("([^"/]+\/[^"]+)", "([^"]+)", "([^"]+)"\), file: "([^"]+)" \}/g;
// win: { url: "https://github.com/owner/repo/releases/download/tag/file", file: "file" }
const ABS = /(win|mac): \{ url: "https:\/\/github\.com\/([^"]+)\/releases\/download\/([^/]+)\/([^"]+)", file: "([^"]+)" \}/g;

const SKIP = /(^sha\d*|\.sha\d*$|\.sig$|\.txt$|\.jsonl$|\.intoto|checksums|\.pdb$|manifest\.json$)/i;
const PRE = /(alpha|beta|rc\d*|preview|nightly)/i;
const WIN_BAD = /(linux|darwin|macos|osx|android|\.deb$|\.rpm$|appimage|\.apk$|\.dmg$|\.pkg$)/i;
const MAC_BAD = /(windows|win32|win64|-win-|linux|android|\.msi$|\.exe$|\.apk$|\.deb$|\.rpm$|appimage)/i;
const ARM = /(arm64|aarch64|armv7)/i;

const ext = (f) => (f.match(/\.[a-z0-9]+$/i) || [""])[0].toLowerCase();
// имя без версии: 1.2.3 / v1.2.3 / 26.11.108 / 0.7.2-alpha
const tokens = (f) =>
  new Set(
    f
      .toLowerCase()
      .replace(/\.[a-z0-9]+$/, "")
      .replace(/v?\d+(?:[._-]\d+)*(?:[-._]?(?:alpha|beta|rc|stable)\d*)?/g, " ")
      .split(/[^a-z0-9]+/)
      .filter(Boolean)
  );

function pickAsset(assets, slot, current) {
  const cur = tokens(current);
  const wantArm = ARM.test(current);
  let best = null;
  for (const a of assets) {
    if (SKIP.test(a.name)) continue;
    if (PRE.test(a.name) && !PRE.test(current)) continue; // не тащим alpha/rc вместо стабильной сборки
    if (slot === "win" ? WIN_BAD.test(a.name) : MAC_BAD.test(a.name)) continue;
    if (slot === "win" && ARM.test(a.name) && !wantArm) continue; // Windows = x64, если в ссылке не arm

    const next = tokens(a.name);
    const shared = [...cur].filter((t) => next.has(t)).length;
    let score = shared * 4 - Math.abs(next.size - cur.size) * 2;
    if (ext(a.name) === ext(current)) score += 10;
    if (wantArm === ARM.test(a.name)) score += 2;

    // явные предпочтения
    if (slot === "win" && /(setup|installer|\.msi$)/i.test(a.name)) score += 3;
    if (slot === "mac" && /\.dmg$/i.test(a.name)) score += 3;

    if (best === null || score > best.score) best = { name: a.name, score };
  }
  return best && best.score >= 12 ? best.name : null;
}

const cache = new Map();
async function releases(repo) {
  if (cache.has(repo)) return cache.get(repo);
  const list = await fetch(`${API}/repos/${repo}/releases?per_page=10`, { headers });
  const out = list.ok ? (await list.json()).filter((r) => !r.draft) : [];
  cache.set(repo, out);
  return out;
}

const src = readFileSync(FILE, "utf8");
const reqs = [];
for (const m of src.matchAll(REL)) reqs.push({ kind: "rel", raw: m[0], slot: m[1], repo: m[2], tag: m[3], asset: m[4] });
for (const m of src.matchAll(ABS)) reqs.push({ kind: "abs", raw: m[0], slot: m[1], repo: m[2], tag: m[3], asset: m[4] });

const seen = new Set();
const changes = [];

for (const r of reqs) {
  if (seen.has(r.raw)) continue;
  seen.add(r.raw);

  const list = await releases(r.repo);
  if (!list.length) { console.log(`skip  ${r.repo}: нет релизов`); continue; }

  // сначала стабильные релизы, затем пререлизы (для проектов вроде Stream Tube, где стабильных нет)
  const ordered = [...list.filter((x) => !x.prerelease && !PRE.test(x.tag_name)), ...list.filter((x) => x.prerelease || PRE.test(x.tag_name))];
  let hit = null;
  for (const rel of ordered) {        // от свежих к старым: берём первый релиз, где есть файл
    const name = (rel.assets || []).find((a) => a.name === r.asset)?.name || pickAsset(rel.assets || [], r.slot, r.asset);
    if (name) { hit = { rel, name }; break; }
  }
  if (!hit) { console.log(`skip  ${r.repo}: файла не нашлось ни в одном релизе`); continue; }
  if (hit.rel.tag_name === r.tag && hit.name === r.asset) continue;

  const next = r.kind === "rel"
    ? `${r.slot}: { url: rel("${r.repo}", "${hit.rel.tag_name}", "${hit.name}"), file: "${hit.name}" }`
    : `${r.slot}: { url: "https://github.com/${r.repo}/releases/download/${hit.rel.tag_name}/${hit.name}", file: "${hit.name}" }`;

  changes.push({ repo: r.repo, from: r.tag, to: hit.rel.tag_name, fromFile: r.asset, toFile: hit.name, raw: r.raw, next });
}

for (const c of changes) {
  const file = c.fromFile === c.toFile ? "" : `  (${c.fromFile} -> ${c.toFile})`;
  console.log(`bump  ${c.repo}  ${c.from} -> ${c.to}${file}`);
}

if (!changes.length) { console.log("всё актуально"); process.exit(0); }
if (DRY) process.exit(0);

let out = src;
for (const c of changes) out = out.replace(c.raw, c.next);
writeFileSync(FILE, out);
console.log(`обновлено приложений: ${new Set(changes.map((c) => c.repo)).size}`);
