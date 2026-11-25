// Обновляет версии и сразу отправляет в GitHub: один шаг на неделю.
// node tools/update-and-push.mjs [--dry]
// --dry только показывает, что изменилось бы, и ничего не коммитит.

import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const DRY = process.argv.includes("--dry");

// git то в PATH, то только внутри GitHub Desktop
const CANDIDATES = [
  "git",
  "C:\\Users\\User\\AppData\\Local\\GitHubDesktop\\app-3.7.0\\resources\\app\\git\\cmd\\git.exe",
  "C:\\Program Files\\Git\\cmd\\git.exe"
];
const GIT = CANDIDATES.find((p) => {
  try {
    return spawnSync(p, ["--version"], { stdio: "ignore" }).status === 0;
  } catch {
    return false;
  }
});
if (!GIT) {
  console.error("git не найден: поставь Git или открой репозиторий в GitHub Desktop");
  process.exit(1);
}

const run = (cmd, args, opts = {}) => spawnSync(cmd, args, { cwd: ROOT, stdio: "inherit", ...opts });

function git(args) {
  const r = spawnSync(GIT, ["-C", ROOT, ...args], { encoding: "utf8" });
  if (r.error) {
    console.error(`git ${args[0]}: ${r.error.message}`);
    process.exit(1);
  }
  return r;
}

if (run(process.execPath, ["tools/update-versions.mjs", ...(DRY ? ["--dry"] : [])]).status !== 0) {
  console.error("обновление версий не прошло");
  process.exit(1);
}
if (DRY) process.exit(0);

if (run(process.execPath, ["--check", "app.js"]).status !== 0) {
  console.error("app.js после обновления не парсится — ничего не коммичу");
  process.exit(1);
}

git(["add", "app.js"]);
if (git(["diff", "--cached", "--quiet"]).status === 0) {
  console.log("версии актуальны, пушить нечего");
  process.exit(0);
}

const date = new Date().toISOString().slice(0, 10);
if (run(GIT, ["-C", ROOT, "commit", "-m", `chore: обновление версий приложений (${date})`], { stdio: "inherit" }).status !== 0) {
  process.exit(1);
}

for (let i = 1; i <= 4; i++) {
  console.log(`push, попытка ${i}`);
  if (run(GIT, ["-C", ROOT, "push", "origin", "main"], { stdio: "inherit" }).status === 0) {
    console.log("готово: версии на GitHub, Pages обновится за минуту");
    process.exit(0);
  }
}
console.error("push не прошёл после 4 попыток: проверь сеть/VPN и нажми Push в GitHub Desktop (коммит уже создан)");
process.exit(1);
