/* WINFORGE — data, router, render */

const GH = "https://github.com";
const rel = (repo, tag, file) => `${GH}/${repo}/releases/download/${tag}/${file}`;

const APPS = [
  {
    slug: "windhawk", name: "Windhawk", hint: "Моды Windows", icon: "icons/windhawk.png", accent: "#c084fc", cat: "custom",
    tag: "Тонкая настройка Windows через моды сообщества — без патчей системы.",
    about: "Платформа модов: каждый твик ставится и снимается отдельно, исходники открыты, а поверх системы ничего не патчится навсегда. Начни с модов на панель задач, таскбар и «Пуск».",
    tags: ["моды", "твики", "open source"],
    url: "https://windhawk.net/",
    win: { url: rel("ramensoftware/windhawk", "v1.7.3", "windhawk_setup.exe"), file: "windhawk_setup.exe" },
    mac: null, macAlt: { name: "TinkerTool", url: "https://www.bresink.com/osx/TinkerTool.html" },
    shots: []
  },
  {
    slug: "rainmeter", name: "Rainmeter", hint: "Виджеты", icon: "icons/rainmeter.png", accent: "#21d4e6", cat: "custom",
    tag: "Живые виджеты, часы и дашборды прямо на рабочем столе.",
    about: "Слой поверх обоев: погода, музыка, загрузка CPU, часы — всё описывается текстовыми скинами, которые можно править или скачать у сообщества.",
    tags: ["виджеты", "скины", "desktop"],
    url: "https://www.rainmeter.net/",
    win: { url: rel("rainmeter/rainmeter", "v4.5.28.3936", "Rainmeter-4.5.28.exe"), file: "Rainmeter-4.5.28.exe" },
    mac: null, macAlt: { name: "Übersicht", url: "https://tracesof.net/uebersicht/" },
    shots: ["shots/rainmeter/win-1.png", "shots/rainmeter/win-2.png", "shots/rainmeter/win-3.png"]
  },
  {
    slug: "aerotweaks", name: "AeroTweaks", hint: "Твики и FPS", icon: "icons/aerotweaks.svg", accent: "#8fd0ff", cat: "optimize",
    tag: "Панель твиков Windows и драйверов: отклик, FPS, задержки.",
    about: "Сборник переключателей для отклика системы и стабильности кадров. Всё через штатные параметры Windows и настройки драйверов, с откатом в один клик.",
    tags: ["твики", "fps", "драйверы"],
    url: "https://aerotweaks.com/",
    win: { url: "https://aerotweaks.com/download", file: "официальная страница загрузки" },
    mac: null, macAlt: { name: "OnyX", url: "https://titanium-software.fr/en/onyx.html" },
    shots: []
  },
  {
    slug: "powertoys", name: "PowerToys", hint: "Утилиты Microsoft", icon: "icons/powertoys.png", accent: "#ff9a4d", cat: "utils",
    tag: "Набор утилит Microsoft: FancyZones, Run, PowerRename и другие.",
    about: "Официальный набор мелких улучшений: сетки окон, быстрый запуск, массовое переименование, цветовая пипетка, поиск по файлам и ещё десяток модулей.",
    tags: ["microsoft", "утилиты", "open source"],
    url: `${GH}/microsoft/PowerToys`,
    win: { url: rel("microsoft/PowerToys", "v0.102.3101", "PowerToysUserSetup-0.102.3101.0-x64.exe"), file: "PowerToysUserSetup-0.102.3101.0-x64.exe" },
    mac: null, macAlt: { name: "Raycast", url: "https://www.raycast.com/" },
    shots: ["shots/powertoys/win-1.png", "shots/powertoys/win-2.png", "shots/powertoys/win-3.png"]
  },
  {
    slug: "rustanything", name: "rust-anything", hint: "Переписывание на Rust", icon: "icons/rustanything.svg", accent: "#ff7a3d", cat: "dev",
    tag: "Переносит проект на Rust по частям и проверяет каждый шаг.",
    about: "Инструмент для AI-агентов: берёт проект на TypeScript, Python, C, Go, Ruby или Java и переписывает его на Rust модуль за модулем. После каждого шага прогоняет записанные кейсы оригинала и останавливается, если поведение разошлось.",
    tags: ["rust", "миграция", "open source"],
    url: `${GH}/erkamyaman/rust-anything`,
    win: { url: rel("erkamyaman/rust-anything", "v4.1.0", "rust-anything-v4.1.0-x86_64-pc-windows-msvc.zip"), file: "rust-anything-v4.1.0-x86_64-pc-windows-msvc.zip" },
    mac: { url: rel("erkamyaman/rust-anything", "v4.1.0", "rust-anything-v4.1.0-aarch64-apple-darwin.tar.gz"), file: "rust-anything-v4.1.0-aarch64-apple-darwin.tar.gz" },
    shots: ["shots/rustanything/win-1.png"]
  },
  {
    slug: "opencode", name: "OpenCode", hint: "AI-терминал", icon: "icons/opencode.svg", accent: "#e2e6ee", cat: "dev",
    tag: "AI-агент для кода в терминале, TUI и редакторе.",
    about: "Открытый агент: читает проект, правит файлы, гоняет команды. Работает из консоли, в отдельном приложении и как расширение к редактору, провайдера моделей выбираешь сам.",
    tags: ["ai", "cli", "open source"],
    url: "https://opencode.ai/",
    win: { url: rel("anomalyco/opencode", "v2.4.1", "opencode-desktop-win-x64.exe"), file: "opencode-desktop-win-x64.exe" },
    mac: { url: rel("anomalyco/opencode", "v2.4.1", "opencode-desktop-mac-arm64.dmg"), file: "opencode-desktop-mac-arm64.dmg" },
    shots: ["shots/opencode/win-1.png"]
  },
  {
    slug: "vscode", name: "VS Code", hint: "Редактор кода", icon: "icons/vscode.png", accent: "#2c8ef0", cat: "dev",
    tag: "Редактор кода, который стал стандартом индустрии.",
    about: "Лёгкий редактор с расширениями на всё: от Python и Docker до тем и гит-графа. Встроенный терминал, отладчик и Live Share из коробки.",
    tags: ["редактор", "расширения", "microsoft"],
    url: "https://code.visualstudio.com/",
    win: { url: "https://update.code.visualstudio.com/latest/win32-x64-user/stable", file: "VSCodeUserSetup-x64.exe" },
    mac: { url: "https://update.code.visualstudio.com/latest/darwin/stable", file: "VSCode-darwin.zip" },
    shots: ["shots/vscode/win-1.png"]
  },
  {
    slug: "node", name: "Node.js", hint: "JS-рантайм", icon: "icons/node.svg", accent: "#6ee7a0", cat: "dev",
    tag: "JavaScript-рантайм для серверов, CLI и сборки фронтенда.",
    about: "Последняя LTS-ветка с npm. Нужен почти всем сборщикам фронтенда и половине CLI-утилит, поэтому ставится первым делом на машину разработчика.",
    tags: ["runtime", "npm", "js"],
    url: "https://nodejs.org/",
    win: { url: "https://nodejs.org/dist/v26.13.1/node-v26.13.1-x64.msi", file: "node-v26.13.1-x64.msi" },
    mac: { url: "https://nodejs.org/dist/v26.13.1/node-v26.13.1.pkg", file: "node-v26.13.1.pkg" },
    shots: []
  },
  {
    slug: "wiztree", name: "WizTree", hint: "Анализ диска", icon: "icons/wiztree.png", accent: "#ffc53d", cat: "optimize",
    tag: "Мгновенный анализ диска через MFT — видно, что съедает место.",
    about: "Читает таблицу NTFS напрямую, поэтому диск на терабайт сканируется секундами. Показывает дерево папок и крупнейшие файлы, умеет искать дубликаты.",
    tags: ["диск", "ntfs", "анализ"],
    url: "https://diskanalyzer.com/",
    win: { url: "https://diskanalyzer.com/files/wiztree_4_30_setup.exe", file: "wiztree_4_30_setup.exe" },
    mac: null, macAlt: { name: "GrandPerspective", url: "https://grandperspectiv.sourceforge.net/" },
    shots: ["shots/wiztree/win-1.jpg", "shots/wiztree/win-2.jpg", "shots/wiztree/win-3.jpg"]
  },
  {
    slug: "happ", name: "Happ", hint: "VPN-клиент", icon: "icons/happ.png", accent: "#ff8099", cat: "net",
    tag: "Кроссплатформенный клиент прокси на ядре Xray.",
    about: "Клиент для VLESS/VMess/Trojan-подписок: импорт конфигурации по ссылке, выбор сервера, сплит-туннелинг и работа в трее. Ядро — Xray.",
    tags: ["xray", "proxy", "vless"],
    url: "https://www.happ.su/",
    win: { url: `${GH}/Happ-proxy/happ-desktop/releases/latest/download/setup-Happ.x64.exe`, file: "setup-Happ.x64.exe" },
    mac: { url: `${GH}/Happ-proxy/happ-desktop/releases/latest/download/Happ.macOS.universal.dmg`, file: "Happ.macOS.universal.dmg" },
    shots: []
  },
  {
    slug: "zapret", name: "Zapret-Discord", hint: "Обход DPI", icon: "icons/zapret.svg", accent: "#ff5f5f", cat: "net",
    tag: "Обход блокировок Discord и YouTube на уровне DPI.",
    about: "Набор bat-скриптов и winws с готовыми пресетами обхода DPI. Ставится как служба, не требует сторонних серверов и не меняет системные файлы.",
    tags: ["dpi", "zapret", "сеть"],
    url: `${GH}/Flowseal/zapret-discord-youtube`,
    win: { url: rel("Flowseal/zapret-discord-youtube", "1.10.4", "zapret-discord-youtube-1.10.4.zip"), file: "zapret-discord-youtube-1.10.4.zip" },
    mac: null, macAlt: { name: "AmneziaVPN", url: "https://amnezia.org/" },
    shots: []
  },
  {
    slug: "translumo", name: "Translumo", hint: "Перевод экрана", icon: "icons/translumo.png", accent: "#3ddcb0", cat: "utils",
    tag: "Перевод текста и субтитров на экране в реальном времени.",
    about: "Выделяешь область — программа распознаёт текст и переводит его поверх картинки. Годится для игр и видео без вшитых субтитров.",
    tags: ["ocr", "перевод", "субтитры"],
    url: `${GH}/Danily07/Translumo`,
    win: { url: "https://github.com/ramjke/Translumo/releases/download/v.1.1.0/Translumo_1.1.0.zip", file: "Translumo_1.1.0.zip" },
    mac: null, macAlt: { name: "Bob", url: "https://bobtranslate.com/" },
    shots: ["shots/translumo/win-1.png", "shots/translumo/win-2.png"]
  },
  {
    slug: "flameshot", name: "Flameshot", hint: "Скриншоты", icon: "icons/flameshot.png", accent: "#c95cff", cat: "utils",
    tag: "Скриншоты с аннотациями: выделил, отметил, отправил.",
    about: "Быстрый снимок области, стрелки, размытие и заливка поверх, копирование в буфер или загрузка на хостинг по горячей клавише.",
    tags: ["скриншоты", "open source", "hotkeys"],
    url: "https://flameshot.org/",
    win: { url: rel("flameshot-org/flameshot", "v15.0.0", "Flameshot-15.0.0-win64.msi"), file: "Flameshot-15.0.0-win64.msi" },
    mac: { url: rel("flameshot-org/flameshot", "v15.0.0", "Flameshot-15.0.0-macos-arm64.dmg"), file: "Flameshot-15.0.0-macos-arm64.dmg" },
    shots: ["shots/flameshot/win-1.png", "shots/flameshot/win-2.png", "shots/flameshot/win-3.png"]
  },
  {
    slug: "deeplivecam", name: "Deep-Live-Cam", hint: "Замена лица", icon: "icons/deeplivecam.svg", accent: "#f472d0", cat: "utils",
    tag: "Замена лица на вебкамере в реальном времени, локально.",
    about: "Подменяет лицо в потоке вебкамеры на выбранное фото и отдаёт результат как виртуальную камеру. Считает локально, наружу ничего не уходит.",
    tags: ["ai", "веб-камера", "open source"],
    url: `${GH}/hacksider/Deep-Live-Cam`,
    win: { url: `${GH}/hacksider/Deep-Live-Cam/archive/refs/tags/2.8.zip`, file: "Deep-Live-Cam-2.8.zip" },
    mac: { url: `${GH}/hacksider/Deep-Live-Cam/archive/refs/tags/2.8.zip`, file: "Deep-Live-Cam-2.8.zip" },
    shots: ["shots/deeplivecam/win-1.png"]
  },
  {
    slug: "duckduckgo", name: "DuckDuckGo", hint: "Приватный браузер", icon: "icons/duckduckgo.png", accent: "#ff7043", cat: "privacy",
    tag: "Приватный браузер и поиск без слежки и профилей.",
    about: "Браузер с блокировкой трекеров по умолчанию, одноразовым сжиганием вкладок и поиском, который не строит профиль. Есть и просто расширение для родного браузера.",
    tags: ["приватность", "браузер", "поиск"],
    url: "https://duckduckgo.com/app",
    win: { url: "https://duckduckgo.com/windows", file: "официальная страница загрузки" },
    mac: { url: "https://duckduckgo.com/mac", file: "официальная страница загрузки" },
    shots: ["shots/duckduckgo/win-1.png", "shots/duckduckgo/win-2.png", "shots/duckduckgo/win-3.png"]
  },
  {
    slug: "deskmakeover", name: "DeskMakeover", hint: "Иконки стола", icon: "icons/deskmakeover.png", accent: "#ff8a6b", cat: "custom",
    tag: "Девять стилей иконок и зоны порядка на рабочем столе.",
    about: "Меняет вид иконок одним щелчком и раскладывает ярлыки по зонам, чтобы рабочий стол не превращался в свалку.",
    tags: ["иконки", "порядок", "open source"],
    url: `${GH}/nicepkg/deskmakeover`,
    win: { url: rel("nicepkg/deskmakeover", "v0.1.1", "DeskMakeover_0.1.1_x64-setup.exe"), file: "DeskMakeover_0.1.1_x64-setup.exe" },
    mac: null, macAlt: null,
    shots: ["shots/deskmakeover/win-1.webp", "shots/deskmakeover/win-2.webp", "shots/deskmakeover/win-3.webp"]
  },
  {
    slug: "deskloom", name: "Deskloom", hint: "Сцены стола", icon: "icons/deskloom.png", accent: "#7c6cff", cat: "custom",
    tag: "Сцены рабочего стола: обои, таскбар, виджеты и курсоры.",
    about: "Собирает «сцены» из обоев, темы панели задач, виджетов и курсоров и переключает их одним нажатием. Ставится из Microsoft Store.",
    tags: ["сцены", "виджеты", "microsoft store"],
    url: "https://apps.microsoft.com/detail/9n37b36gqq8b",
    win: { url: "https://apps.microsoft.com/detail/9n37b36gqq8b", file: "страница в Microsoft Store" },
    mac: null, macAlt: { name: "Plash", url: "https://sindresorhus.com/plash" },
    shots: []
  },
  {
    slug: "wirelessbattery", name: "Wireless Battery", hint: "Заряд мышей", icon: "icons/wirelessbattery.svg", accent: "#d4e157", cat: "utils",
    tag: "Заряд беспроводных мышей, клавиатур и наушников в одном виджете.",
    about: "Читает уровень заряда HID-устройств напрямую и показывает его в трее, без родных утилит производителя и лишних служб.",
    tags: ["батарея", "hid", "open source"],
    url: `${GH}/krisgfx9/Wireless-Device-Battery-Monitor`,
    win: { url: rel("krisgfx9/Wireless-Device-Battery-Monitor", "v1.0.4", "WirelessBattery-Setup-1.0.4.exe"), file: "WirelessBattery-Setup-1.0.4.exe" },
    mac: null, macAlt: { name: "AirBattery", url: `${GH}/lihaoyun6/AirBattery` },
    shots: ["shots/wirelessbattery/win-1.png"]
  },
  {
    slug: "oxigram", name: "Oxigram", hint: "Клиент Telegram", icon: "icons/oxigram.png", accent: "#5a5cf5", cat: "net",
    tag: "Телеграм-клиент на Rust: около 10–30 МБ памяти, без Electron.",
    about: "Нативный клиент Telegram на Rust без браузерного движка: стартует мгновенно, держит 10–30 МБ памяти и не грузит процессор в простое.",
    tags: ["telegram", "rust", "лёгкий"],
    url: `${GH}/Timon2306/oxigram`,
    win: { url: rel("Timon2306/oxigram", "v0.3.2", "oxigram-windows-x64-oxigram-native_0.3.2_x64-setup.exe"), file: "oxigram-windows-x64-oxigram-native_0.3.2_x64-setup.exe" },
    mac: { url: rel("Timon2306/oxigram", "v0.3.2", "oxigram-macos-apple-silicon-Oxigram_0.3.2_aarch64.dmg"), file: "oxigram-macos-apple-silicon-Oxigram_0.3.2_aarch64.dmg" },
    shots: ["shots/oxigram/win-1.webp", "shots/oxigram/win-2.webp", "shots/oxigram/win-3.webp"]
  },
  {
    slug: "wintoys", name: "WinToys", hint: "Твики Windows", icon: "icons/wintoys.png", accent: "#4fc3f7", cat: "optimize",
    tag: "Панель здоровья системы: службы, автозапуск, приложения и твики.",
    about: "Понятный интерфейс вместо regedit: отключает телеметрию и лишние службы, чистит автозапуск, ставит и обновляет приложения из Store. Ставится из Microsoft Store.",
    tags: ["твики", "оптимизация", "store"],
    url: "https://apps.microsoft.com/detail/9p8ltpgczxwg",
    win: { url: "https://apps.microsoft.com/detail/9p8ltpgczxwg", file: "страница в Microsoft Store" },
    mac: null, macAlt: null,
    shots: []
  },
  {
    slug: "winhance", name: "Winhance", hint: "Debloat Windows", icon: "icons/winhance.png", accent: "#ffa94d", cat: "optimize",
    tag: "Debloat, твики и установка приложений в одном окне.",
    about: "Открытая утилита: убирает встроенные приложения и телеметрию, переключает службы и оформление, ставит и удаляет программы из Store и winget. Пресеты настроек можно сохранить и применить на другой машине.",
    tags: ["debloat", "твики", "open source"],
    url: "https://winhance.net/",
    win: { url: rel("memstechtips/Winhance", "v26.06.12", "Winhance.Installer.exe"), file: "Winhance.Installer.exe" },
    mac: null, macAlt: { name: "OnyX", url: "https://titanium-software.fr/en/onyx.html" },
    shots: []
  },
  {
    slug: "nilesoft", name: "Nilesoft Shell", hint: "Меню Проводника", icon: "icons/nilesoft.png", accent: "#9ccc65", cat: "custom",
    tag: "Контекстное меню Проводника, собранное под себя.",
    about: "Заменяет стандартное меню правой кнопки своим: условия по типу файла, иконки, подменю, команды и скрипты. Настраивается текстовым конфигом.",
    tags: ["контекстное меню", "проводник", "open source"],
    url: "https://nilesoft.org/",
    win: { url: "https://nilesoft.org/download", file: "официальная страница загрузки" },
    mac: null, macAlt: null,
    shots: []
  },
  {
    slug: "localsend", name: "LocalSend", hint: "Передача файлов", icon: "icons/localsend.png", accent: "#1de9b6", cat: "utils",
    tag: "Передача файлов по локальной сети без облака и аккаунтов.",
    about: "Отправляет файлы и текст на телефон, ноутбук и телевизор в одной Wi-Fi сети. Без интернета, регистрации и серверов посередине.",
    tags: ["lan", "файлы", "open source"],
    url: "https://localsend.org/",
    win: { url: rel("localsend/localsend", "v1.19.0", "LocalSend-1.19.0-windows-x86-64.exe"), file: "LocalSend-1.19.0-windows-x86-64.exe" },
    mac: { url: rel("localsend/localsend", "v1.19.0", "LocalSend-1.19.0.dmg"), file: "LocalSend-1.19.0.dmg" },
    shots: ["shots/localsend/win-1.jpg", "shots/localsend/win-2.jpg", "shots/localsend/win-3.jpg"]
  },
  {
    slug: "geek", name: "Geek Uninstaller", hint: "Удаление программ", icon: "icons/geek.png", accent: "#7e9cff", cat: "optimize",
    tag: "Чистое удаление программ вместе с остатками в реестре и папках.",
    about: "Портативный деинсталлятор: удаляет программу, затем находит её хвосты в реестре и на диске. Не требует установки — распаковал и запустил.",
    tags: ["uninstall", "реестр", "portable"],
    url: "https://geekuninstaller.com/",
    win: { url: "https://geekuninstaller.com/geek.zip", file: "geek.zip" },
    mac: null, macAlt: { name: "AppCleaner", url: "https://freemacsoft.net/appcleaner/" },
    shots: []
  },
  {
    slug: "memreduct", name: "Mem Reduct", hint: "Очистка RAM", icon: "icons/memreduct.svg", accent: "#ffd166", cat: "optimize",
    tag: "Освобождает оперативную память по расписанию и по горячей клавише.",
    about: "Сбрасывает рабочие наборы и кэш через системные вызовы, показывает занятую память в трее и умеет чистить по порогу заполнения или по таймеру.",
    tags: ["ram", "память", "open source"],
    url: `${GH}/henrypp/memreduct`,
    win: { url: rel("henrypp/memreduct", "v.3.5.2", "memreduct-3.5.2-setup.exe"), file: "memreduct-3.5.2-setup.exe" },
    mac: null, macAlt: { name: "Memory Clean", url: "https://fiplab.com/apps/memory-clean-for-mac" },
    shots: []
  },
  {
    slug: "winrar", name: "WinRAR", hint: "Архиватор", icon: "icons/winrar.svg", accent: "#b39ddb", cat: "utils",
    tag: "Архиватор, который открывает вообще всё.",
    about: "RAR и ZIP на запись, всё остальное на чтение: 7z, ISO, tar, gz. Умеет шифровать архивы, делить на тома и восстанавливать повреждённые файлы.",
    tags: ["архивы", "rar", "zip"],
    url: "https://www.win-rar.com/download.html",
    win: { url: "https://www.win-rar.com/fileadmin/winrar-versions/winrar-x64-711.exe", file: "winrar-x64-711.exe" },
    mac: null, macAlt: { name: "Keka", url: "https://www.keka.io/" },
    shots: []
  },
  {
    slug: "serein", name: "Serein", hint: "Discord на Rust", icon: "icons/serein.png", accent: "#5865f2", cat: "net",
    tag: "Нативный клиент Discord без Electron: мало памяти и быстрый старт.",
    about: "Написан на Rust, не тащит за собой Chromium. Каналы, личные сообщения и звонки остаются, а десятки мегабайт памяти в простое — нет.",
    tags: ["discord", "rust", "лёгкий"],
    url: `${GH}/ViceVerse-cz/Serein`,
    win: { url: `${GH}/ViceVerse-cz/Serein/releases`, file: "страница релизов на GitHub" },
    mac: { url: `${GH}/ViceVerse-cz/Serein/releases`, file: "страница релизов на GitHub" },
    shots: ["shots/serein/win-1.png", "shots/serein/win-2.png", "shots/serein/win-3.png"]
  },
  {
    slug: "rustdesk", name: "RustDesk", hint: "Удалённый доступ", icon: "icons/rustdesk.svg", accent: "#00b4d8", cat: "net",
    tag: "Удалённый рабочий стол с открытым кодом и своим сервером.",
    about: "Аналог TeamViewer без лицензий и лимитов: подключаешься по ID или паролю, а при желании поднимаешь собственный релей-сервер и не зависишь от чужого.",
    tags: ["remote", "rdp", "open source"],
    url: "https://rustdesk.com/",
    win: { url: rel("rustdesk/rustdesk", "1.5.3", "rustdesk-1.5.3-x86_64.msi"), file: "rustdesk-1.5.3-x86_64.msi" },
    mac: { url: rel("rustdesk/rustdesk", "1.5.3", "rustdesk-1.5.3-aarch64.dmg"), file: "rustdesk-1.5.3-aarch64.dmg" },
    shots: ["shots/rustdesk/win-1.png", "shots/rustdesk/win-2.png", "shots/rustdesk/win-3.png"]
  },
  {
    slug: "kaspersky", name: "Kaspersky Free", hint: "Антивирус", icon: "icons/kaspersky.svg", accent: "#1c8f3f", cat: "security",
    tag: "Бесплатный антивирус с фоновой защитой и проверкой по требованию.",
    about: "Бесплатная редакция: файловый щит, защита веб-страниц и ручная проверка. Платная подписка добавляет VPN, менеджер паролей и защиту платежей.",
    tags: ["антивирус", "защита", "free"],
    url: "https://www.kaspersky.com/free-antivirus",
    win: { url: "https://www.kaspersky.com/free-antivirus", file: "официальная страница загрузки" },
    mac: null, macAlt: null,
    shots: []
  },
  {
    slug: "java", name: "Java (JDK)", hint: "Java-рантайм", icon: "icons/java.svg", accent: "#f89820", cat: "dev",
    tag: "Актуальный JDK с установщиком, который сам ставит обновления.",
    about: "Сборка Eclipse Temurin: последняя LTS-ветка ставится MSI-пакетом, переменные среды и java в PATH настраиваются автоматически. Нужна для Minecraft, Android Studio и Java-приложений.",
    note: "Ссылка всегда ведёт на свежий билд ветки 21 LTS: скачай новый MSI и запусти поверх старой версии — установщик обновит Java и сохранит настройки.",
    tags: ["jdk", "temurin", "lts"],
    url: "https://adoptium.net/",
    win: { url: "https://api.adoptium.net/v3/binary/latest/21/ga/windows/x64/jdk/hotspot/normal/eclipse", file: "Temurin-JDK-21-x64.msi" },
    mac: { url: "https://api.adoptium.net/v3/binary/latest/21/ga/mac/aarch64/jdk/hotspot/normal/eclipse", file: "Temurin-JDK-21-aarch64.pkg" },
    shots: []
  },
  {
    slug: "qbittorrent", name: "qBittorrent", hint: "Торрент-клиент", icon: "icons/qbittorrent.png", accent: "#4f9dff", cat: "net",
    tag: "Торрент-клиент без рекламы и лишних модулей.",
    about: "Открытый клиент с поиском по торрент-трекерам, очередями, ограничением скорости и веб-интерфейсом. Без баннеров, которых полно в uTorrent.",
    tags: ["torrent", "p2p", "open source"],
    url: "https://www.qbittorrent.org/",
    win: { url: "https://www.fosshub.com/qBittorrent.html", file: "официальная страница загрузки" },
    mac: { url: "https://www.qbittorrent.org/download", file: "официальная страница загрузки" },
    shots: []
  },
  {
    slug: "nedotify", name: "NeDotify", hint: "Музыка", icon: "icons/nedotify.png", accent: "#e879f9", cat: "utils",
    tag: "Музыкальный плеер: локальная библиотека и онлайн-источники.",
    about: "Плеер для Windows: читает локальные файлы, подтягивает треки из онлайн-источников, показывает текст песни и запоминает статистику прослушиваний.",
    tags: ["музыка", "плеер", "open source"],
    url: `${GH}/PoviceProgrammer/NeDotify`,
    win: { url: rel("PoviceProgrammer/NeDotify", "v2.6.5", "Soneth_v2.6.5.exe"), file: "Soneth_v2.6.5.exe" },
    mac: null, macAlt: { name: "IINA", url: "https://iina.io/" },
    shots: ["shots/nedotify/win-1.png", "shots/nedotify/win-3.png"]
  },
  {
    slug: "ea", name: "EA app", hint: "Игры EA", icon: "icons/ea.svg", accent: "#ff4747", cat: "games",
    tag: "Официальный клиент EA для покупки и запуска игр.",
    about: "Заменяет Origin: библиотека, загрузки, друзья и подписка Play. Нужен для Battlefield, FIFA/FC, Sims и Apex Legends.",
    tags: ["игры", "ea", "store"],
    url: "https://www.ea.com/ea-app",
    win: { url: "https://www.ea.com/ea-app", file: "официальная страница загрузки" },
    mac: null, macAlt: null,
    shots: []
  },
  {
    slug: "steam", name: "Steam", hint: "Игровая платформа", icon: "icons/steam.svg", accent: "#66c0f4", cat: "games",
    tag: "Официальный клиент Steam: магазин, библиотека и друзья.",
    about: "Магазин, загрузки, облачные сохранения, мастерская и чат в одном клиенте. Нужен для большинства PC-игр, включая бесплатные и семейный доступ.",
    tags: ["игры", "steam", "store"],
    url: "https://store.steampowered.com/about/",
    win: { url: "https://cdn.akamai.steamstatic.com/client/installer/SteamSetup.exe", file: "SteamSetup.exe" },
    mac: { url: "https://cdn.akamai.steamstatic.com/client/installer/steam.dmg", file: "steam.dmg" },
    shots: []
  },
  {
    slug: "apkstart", name: "ApkStart", hint: "Android на Windows", icon: "icons/apkstart.png", accent: "#3ddc84", cat: "utils",
    tag: "Запускает APK на Windows как обычные программы.",
    about: "Двойной клик по APK — приложение ставится и появляется ярлыком на рабочем столе, открываясь в отдельном окне. Внутри собственный QEMU-рантайм, поэтому не нужны WSA, Hyper-V и тяжёлые эмуляторы.",
    note: "Первый запуск скачивает и готовит Android-образ — это долго и требует ~10 ГБ на диске. Дальше приложения стартуют почти мгновенно.",
    tags: ["android", "apk", "open source"],
    url: `${GH}/RoutineMiku/apkstart`,
    win: { url: rel("RoutineMiku/apkstart", "v0.6.4", "ApkStart-0.6.4-Setup.exe"), file: "ApkStart-0.6.4-Setup.exe" },
    mac: null, macAlt: null,
    shots: ["shots/apkstart/win-1.png", "shots/apkstart/win-2.png"]
  },
  {
    slug: "fluentcleaner", name: "FluentCleaner", hint: "Чистка системы", icon: "icons/fluentcleaner.png", accent: "#4fc3f7", cat: "optimize",
    tag: "Открытая замена CCleaner: чистит мусор без рекламы и пугалок.",
    about: "Современный клинер на WinUI 3: удаляет временные файлы, кэши браузеров и логи, понимает формат winapp2.ini от сообщества. Без рекламы, допродаж и «оптимизации реестра», которой не существует.",
    tags: ["очистка", "ccleaner", "open source"],
    url: `${GH}/builtbybel/FluentCleaner`,
    win: { url: rel("builtbybel/FluentCleaner", "26.11.123", "FluentCleaner-win-x64.zip"), file: "FluentCleaner-win-x64.zip" },
    mac: null, macAlt: { name: "OnyX", url: "https://titanium-software.fr/en/onyx.html" },
    shots: ["shots/fluentcleaner/win-1.png"]
  },
  {
    slug: "streamtube", name: "Stream Tube", hint: "YouTube без рекламы", icon: "icons/streamtube.png", accent: "#ff2d78", cat: "utils",
    tag: "Нативный клиент YouTube на Rust: без рекламы и трекеров.",
    about: "Проигрывает видео напрямую через mpv, поэтому реклама и промо-блоки не загружаются вовсе. Из коробки SponsorBlock, DeArrow и Return YouTube Dislike, есть подписки, Shorts и поиск.",
    note: "Сборки пока в статусе alpha, версия помечена как prerelease. Версия для macOS собрана сообществом и помечена UNOFFICIAL.",
    tags: ["youtube", "rust", "open source"],
    url: `${GH}/Avaneesh-Inamdar/Stream-Tube-Desktop`,
    win: { url: rel("Avaneesh-Inamdar/Stream-Tube-Desktop", "v0.7.5-alpha", "StreamTube-0.7.5-alpha-setup.exe"), file: "StreamTube-0.7.5-alpha-setup.exe" },
    mac: { url: rel("Avaneesh-Inamdar/Stream-Tube-Desktop", "v0.7.5-alpha", "StreamTube-0.7.5-alpha-macos-arm64-UNOFFICIAL.zip"), file: "StreamTube-0.7.5-alpha-macos-arm64-UNOFFICIAL.zip" },
    shots: ["shots/streamtube/win-1.png", "shots/streamtube/win-2.png"]
  },
  {
    slug: "markmello", name: "MarkMello", hint: "Чтение Markdown", icon: "icons/markmello.png", accent: "#dcdce6", cat: "utils",
    tag: "Открывает Markdown сразу в режиме чтения, редактор — по кнопке.",
    about: "Двойной клик по .md — документ открывается как книга: тема, размер шрифта, межстрочный интервал и ширина колонки настраиваются. Режим правки включается вручную, чтобы случайно ничего не задеть.",
    tags: ["markdown", "редактор", "open source"],
    url: "https://markmello.ru",
    win: { url: rel("dartdavros/MarkMello", "v0.7.0", "MarkMello-setup-win-x64.exe"), file: "MarkMello-setup-win-x64.exe" },
    mac: { url: rel("dartdavros/MarkMello", "v0.7.0", "MarkMello-macos-arm64.dmg"), file: "MarkMello-macos-arm64.dmg" },
    shots: ["shots/markmello/win-1.png"]
  },
  {
    slug: "phonebox", name: "PhoneBox", hint: "Панель из телефона", icon: "icons/phonebox.png", accent: "#34d399", cat: "custom",
    tag: "Превращает старый Android-телефон в панель управления ПК.",
    about: "На телефон ставится приложение, на компьютер — небольшой агент: по USB или Wi-Fi телефон показывает загрузку CPU и GPU, часы, музыку и плитки с командами. 132 виджета и 30 готовых шаблонов, раскладка собирается в браузере, без облака и аккаунтов.",
    note: "На телефон нужен APK из того же релиза (PhoneBox-0.9.29.apk), ссылка на странице релизов.",
    tags: ["android", "панель", "open source"],
    url: `${GH}/ersinkoc/phonebox`,
    win: { url: rel("ersinkoc/phonebox", "v0.9.29", "PhoneBoxAgent-0.9.29-win-x64.zip"), file: "PhoneBoxAgent-0.9.29-win-x64.zip" },
    mac: { url: rel("ersinkoc/phonebox", "v0.9.29", "PhoneBoxAgent-0.9.29-osx-arm64.zip"), file: "PhoneBoxAgent-0.9.29-osx-arm64.zip" },
    shots: ["shots/phonebox/win-1.png", "shots/phonebox/win-2.png", "shots/phonebox/win-3.png", "shots/phonebox/win-4.png"]
  },
  {
    slug: "mimic", name: "Mimic", hint: "Discord-статус", icon: "icons/mimic.svg", accent: "#a855f7", cat: "utils",
    tag: "Статус Discord из любого приложения — без запущенного клиента.",
    about: "Показывает в профиле Discord, что ты слушаешь или во что играешь, даже если сам клиент закрыт. Настраивается списком правил.",
    tags: ["discord", "rich presence", "open source"],
    url: `${GH}/Timon2306/mimic-discord`,
    win: { url: rel("Timon2306/mimic-discord", "v1.3.4", "mimic_1.3.4_x64-setup.exe"), file: "mimic_1.3.4_x64-setup.exe" },
    mac: null, macAlt: null,
    shots: []
  },
  {
    slug: "pineconemc", name: "PineconeMC", hint: "Minecraft-лаунчер", icon: "icons/pineconemc.png", accent: "#7ed957", cat: "games",
    tag: "Лаунчер Minecraft с модами и аккаунтами Ely.by.",
    about: "Форк Prism Launcher: профили с разными версиями и сборками модов, поддержка Ely.by и офлайн-аккаунтов, тонкая настройка памяти и Java.",
    tags: ["minecraft", "моды", "open source"],
    url: `${GH}/ElyPrismLauncher/Launcher`,
    win: { url: rel("ElyPrismLauncher/Launcher", "11.1.2", "PineconeMC-Windows-MSVC-Setup-11.1.2.exe"), file: "PineconeMC-Windows-MSVC-Setup-11.1.2.exe" },
    mac: { url: rel("ElyPrismLauncher/Launcher", "11.1.2", "PineconeMC-macOS-11.1.2.dmg"), file: "PineconeMC-macOS-11.1.2.dmg" },
    shots: []
  },
  {
    slug: "python", name: "Python", hint: "Python + IDLE", icon: "icons/python.png", accent: "#4b8bbe", cat: "dev",
    tag: "Python 3.12 с IDLE — двойной клик по .py открывает редактор.",
    about: "У тебя уже стоит ветка 3.12 (3.12.7), установщик отсюда — та же ветка 3.12.10 со всеми правками. Ставит pythonw и IDLE: файлы .py открываются в редакторе с запуском по F5, а не в консоли, и в PATH попадают python и pip.",
    note: "Чтобы двойной клик по .py открывал именно IDLE: правый клик по файлу → «Открыть с помощью» → «Выбрать другое приложение» → IDLE (Python 3.12) → «Всегда». При установке оставь галочку «Associate files with Python». Переустанавливать поверх 3.12.7 не обязательно.",
    tags: ["python", "idle", "pip"],
    url: "https://www.python.org/downloads/windows/",
    win: { url: "https://www.python.org/ftp/python/3.12.10/python-3.12.10-amd64.exe", file: "python-3.12.10-amd64.exe" },
    mac: { url: "https://www.python.org/ftp/python/3.12.10/python-3.12.10-macos11.pkg", file: "python-3.12.10-macos11.pkg" },
    shots: []
  },
  {
    slug: "voicemode", name: "VoiceMode", hint: "Голос для AI", icon: "icons/voicemode.svg", accent: "#f0abfc", cat: "dev",
    tag: "Бесплатный голосовой плагин: свои голоса, локальные модели.",
    about: "Плагин к Claude Code и другим MCP-клиентам: говоришь вслух — агент отвечает голосом. Голоса подключаются любые, включая свои, работа идёт локально через Whisper и Kokoro.",
    tags: ["mcp", "голос", "open source"],
    url: `${GH}/mbailey/voicemode`,
    win: { url: `${GH}/mbailey/voicemode/archive/refs/tags/v9.0.2.zip`, file: "voicemode-9.0.2.zip" },
    mac: { url: `${GH}/mbailey/voicemode/archive/refs/tags/v9.0.2.zip`, file: "voicemode-9.0.2.zip" },
    shots: []
  },
  {
    slug: "cursor", name: "Cursor", hint: "AI-редактор", icon: "icons/cursor.svg", accent: "#b0b0ff", cat: "dev",
    tag: "Редактор кода с агентом внутри: правки по описанию задачи.",
    about: "Форк VS Code с моделями в основе: выделяешь код и просишь изменить, агент правит несколько файлов сразу и объясняет, что поменял. Расширения и настройки — от VS Code.",
    tags: ["ai", "редактор", "agent"],
    url: "https://cursor.com/",
    win: { url: "https://cursor.com/downloads", file: "официальная страница загрузки" },
    mac: { url: "https://cursor.com/downloads", file: "официальная страница загрузки" },
    shots: []
  },
  {
    slug: "git", name: "Git", hint: "Git для Windows", icon: "icons/git.svg", accent: "#f1502f", cat: "dev",
    tag: "Git и Git Bash: командная строка, ключи и хуки.",
    about: "Официальная сборка Git for Windows: git в PATH, Git Bash, менеджер учётных данных. Базовая вещь для любого репозитория.",
    tags: ["git", "cli", "bash"],
    url: "https://git-scm.com/",
    win: { url: "https://git-scm.com/download/win", file: "официальная страница загрузки" },
    mac: { url: "https://git-scm.com/download/mac", file: "официальная страница загрузки" },
    shots: []
  },
  {
    slug: "githubdesktop", name: "GitHub Desktop", hint: "Git-клиент", icon: "icons/githubdesktop.svg", accent: "#a371f7", cat: "dev",
    tag: "Git с человеческим лицом: коммиты, ветки и PR мышкой.",
    about: "Официальный клиент GitHub: клонирование, коммиты кусками, переключение веток, конфликты и пул-реквесты без командной строки. Рядом ставится и git.",
    tags: ["github", "git", "gui"],
    url: "https://desktop.github.com/",
    win: { url: "https://central.github.com/deployments/desktop/desktop/latest/win32", file: "GitHubDesktopSetup-x64.exe" },
    mac: { url: "https://central.github.com/deployments/desktop/desktop/latest/darwin", file: "GitHubDesktop-x64.zip" },
    shots: []
  }
];

const CATS = [
  { id: "all", label: "Все" },
  { id: "custom", label: "Кастомизация" },
  { id: "optimize", label: "Оптимизация" },
  { id: "dev", label: "Разработка" },
  { id: "net", label: "Сеть" },
  { id: "utils", label: "Утилиты" },
  { id: "games", label: "Игры" },
  { id: "privacy", label: "Приватность" },
  { id: "security", label: "Защита" }
];

const state = { cat: "all", q: "", os: "win", picked: new Set(), expanded: false };

const $ = (id) => document.getElementById(id);
const grid = $("grid");
const filters = $("filters");
const count = $("count");
const empty = $("empty");
const toast = $("toast");
const searchInput = $("search");
const home = $("home");
const detail = $("detail");

const catLabel = (id) => (CATS.find((c) => c.id === id) || {}).label || id;
const plural = (n, one, few, many) =>
  n % 100 >= 11 && n % 100 <= 14 ? many : n % 10 === 1 ? one : n % 10 >= 2 && n % 10 <= 4 ? few : many;
const pickFor = (app) => (state.os === "mac" ? app.mac : app.win);
const hasFor = (app) => Boolean(pickFor(app));
const isPage = (p) => !/\.[a-z0-9]{2,5}$/i.test(p.file.split("/").pop());
const fileTag = (p) => (isPage(p) ? "САЙТ" : (p.file.split(".").pop() || "").slice(0, 4));

const ICONS = {
  win: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 5.5 10.5 4.4v7.1H3zM11.7 4.2 21 3v8.5h-9.3zM3 12.7h7.5v7.1L3 18.7zM11.7 12.7H21V21l-9.3-1.3z"/></svg>',
  mac: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.37 1.43c0 1.14-.49 2.27-1.18 3.08-.74.9-1.99 1.57-2.98 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.57-2.27 1.2-2.98.8-.94 2.15-1.64 3.25-1.68.03.13.05.28.05.43Zm4.57 15.71c-.03.07-.47 1.58-1.52 3.12-.95 1.34-1.94 2.71-3.43 2.71-1.52 0-1.9-.88-3.63-.88-1.7 0-2.3.91-3.67.91-1.38 0-2.33-1.26-3.43-2.8C3.97 18.38 2.94 15.57 2.94 12.92c0-4.28 2.8-6.55 5.55-6.55 1.45 0 2.68.95 3.59.95.86 0 2.23-1 3.86-1 .62 0 2.87.06 4.36 2.18-.11.07-2.15 1.31-2.15 3.91 0 3.09 2.67 4.18 2.86 4.24Z"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17 17 7m0 0H8m9 0v9" stroke="currentColor" stroke-width="2" stroke-linecap="square"/></svg>',
  back: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M19 12H5m0 0 6-6m-6 6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="square"/></svg>'
};

const logo = (app, cls = "logo") =>
  `<span class="${cls}"><img src="${app.icon}" alt="" loading="lazy" decoding="async"></span>`;

/* ---------- cards ---------- */

function downloadBtn(app, os, label, icon) {
  const p = os === "mac" ? app.mac : app.win;
  if (p) {
    const ext = fileTag(p);
    return `<button type="button" class="dl" data-dl="${app.slug}" data-os="${os}">
      ${icon} ${label} <em>${ext}</em>
    </button>`;
  }
  if (os === "mac" && app.macAlt) {
    return `<a class="dl dl--alt" href="${app.macAlt.url}" target="_blank" rel="noopener noreferrer"
      title="${app.macAlt.name} — аналог для macOS">
      ${ICONS.mac} macOS <em>аналог</em>
    </a>`;
  }
  if (os === "mac") return '<span class="dl dl--empty">macOS — нет версии</span>';
  return '<span class="dl dl--empty">нет файла</span>';
}

function card(app, index) {
  const delay = Math.min(index * 30, 240);
  return `<article class="card" data-slug="${app.slug}" style="--accent:${app.accent};transition-delay:${delay}ms" data-reveal>
    <div class="card__top">
      <span class="card__num">${String(index + 1).padStart(2, "0")}</span>
      <span class="card__cat">${catLabel(app.cat)}</span>
    </div>
    <a class="card__head" href="#/a/${app.slug}">
      ${logo(app, "card__logo")}
      <div>
        <h3>${app.name} <span class="hint">${app.hint}</span></h3>
        <p class="card__tag">${app.tag}</p>
      </div>
    </a>
    <div class="card__tags">${app.tags.map((t) => `<span>${t}</span>`).join("")}</div>
    <div class="card__actions">
      <a class="btn-site" href="${app.url}" target="_blank" rel="noopener noreferrer">
        Официальный сайт ${ICONS.arrow}
      </a>
      <div class="dl-row">
        ${downloadBtn(app, "win", "Windows 11", ICONS.win)}
        ${downloadBtn(app, "mac", "macOS", ICONS.mac)}
      </div>
    </div>
  </article>`;
}

/* ---------- tickers: две ленты, приложения не повторяются ---------- */

function tickerItem(a) {
  return `<a class="ticker__item" href="#/a/${a.slug}" style="--accent:${a.accent}">
    <img src="${a.icon}" alt="" loading="lazy"><b>${a.name}</b><i>${a.hint}</i></a>`;
}

function renderTickers() {
  const front = APPS.filter((_, i) => i % 2 === 0);
  const back = APPS.filter((_, i) => i % 2 === 1);
  $("tickerA").innerHTML = (front.map(tickerItem).join("")) + front.map(tickerItem).join("");
  $("tickerB").innerHTML = (back.map(tickerItem).join("")) + back.map(tickerItem).join("");
}

/* ---------- catalog ---------- */

function renderFilters() {
  filters.innerHTML = CATS.map((c) => {
    const n = c.id === "all" ? APPS.length : APPS.filter((a) => a.cat === c.id).length;
    return `<button type="button" data-cat="${c.id}" aria-pressed="${state.cat === c.id}">${c.label}<span>${n}</span></button>`;
  }).join("");
}

function render() {
  const q = state.q.trim().toLowerCase();
  const list = APPS.filter((a) => {
    const inCat = state.cat === "all" || a.cat === state.cat;
    const hay = `${a.name} ${a.hint} ${a.tag} ${a.tags.join(" ")} ${catLabel(a.cat)}`.toLowerCase();
    return inCat && (!q || hay.includes(q));
  });

  grid.innerHTML = list.map((a) => card(a, APPS.indexOf(a))).join("");
  count.textContent = list.length;
  $("countLabel").textContent = plural(list.length, "приложение", "приложения", "приложений");
  empty.hidden = list.length > 0;
  grid.querySelectorAll("[data-reveal]").forEach((el) => revealObserver.observe(el));
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
);

/* ---------- detail page ---------- */

function album(app) {
  if (!app.shots || !app.shots.length) return "";
  return `<section class="album">
    <div class="album__head">
      <h3>Скриншоты</h3>
      <span>${app.shots.length} · Windows 11</span>
    </div>
    <div class="album__strip">
      ${app.shots
        .map(
          (src, i) => `<button type="button" class="album__shot" data-shot="${i}">
            <img src="${src}" alt="${app.name} — скриншот ${i + 1}" loading="lazy" decoding="async"></button>`
        )
        .join("")}
    </div>
  </section>`;
}

function detailLinks(app) {
  const macSite = app.macAlt
    ? { label: `Сайт ${app.macAlt.name}`, url: app.macAlt.url }
    : app.mac
      ? { label: "Сайт (macOS)", url: isPage(app.mac) ? app.mac.url : app.url }
      : null;

  const dlCard = (os, icon) => {
    const p = os === "mac" ? app.mac : app.win;
    if (!p) {
      return `<div class="dcard dcard--off">
        ${icon}<b>${os === "mac" ? "macOS" : "Windows 11"}</b>
        <span>${os === "mac" && app.macAlt ? "нет версии, есть аналог выше" : "версия недоступна"}</span>
      </div>`;
    }
    return `<button type="button" class="dcard" data-dl="${app.slug}" data-os="${os}">
      ${icon}<b>${p.file}</b><span>скачать · ${os === "mac" ? "macOS" : "Windows 11"}</span>
    </button>`;
  };

  return `<div class="dlgrid">
    <a class="dcard dcard--site" href="${app.url}" target="_blank" rel="noopener noreferrer">
      ${ICONS.win}<b>Сайт (Windows)</b><span>${app.url.replace(/^https?:\/\//, "")}</span>
    </a>
    ${
      macSite
        ? `<a class="dcard dcard--site" href="${macSite.url}" target="_blank" rel="noopener noreferrer">
             ${ICONS.mac}<b>${macSite.label}</b><span>${macSite.url.replace(/^https?:\/\//, "")}</span>
           </a>`
        : `<div class="dcard dcard--off">${ICONS.mac}<b>Сайт (macOS)</b><span>версии для macOS нет</span></div>`
    }
    ${dlCard("win", ICONS.win)}
    ${dlCard("mac", ICONS.mac)}
  </div>`;
}

function showDetail(app) {
  home.hidden = true;
  detail.hidden = false;
  detail.style.setProperty("--accent", app.accent);
  detail.dataset.shots = JSON.stringify(app.shots || []);
  detail.innerHTML = `
    <div class="detail__bar">
      <a class="back" href="#/">${ICONS.back} Каталог</a>
    </div>
    <div class="detail__hero">
      ${logo(app, "detail__logo")}
      <div>
        <p class="detail__cat">${catLabel(app.cat)} · <span class="hint">${app.hint}</span></p>
        <h1>${app.name}</h1>
        <p class="detail__tag">${app.tag}</p>
      </div>
    </div>
    <p class="detail__about">${app.about}</p>
    <div class="card__tags detail__tags">${app.tags.map((t) => `<span>${t}</span>`).join("")}</div>
    ${app.note ? `<p class="detail__note">${app.note}</p>` : ""}
    ${detailLinks(app)}
    ${album(app)}
  `;
  window.scrollTo(0, 0);
}

function showHome() {
  detail.hidden = true;
  detail.innerHTML = "";
  detail.style.removeProperty("--accent");
  home.hidden = false;
}

function focusCard(slug) {
  const card = grid.querySelector(`[data-slug="${slug}"]`);
  if (!card) return;
  card.classList.add("in", "is-focus");
  card.scrollIntoView({ block: "center", behavior: "smooth" });
  setTimeout(() => card.classList.remove("is-focus"), 2600);
}

let lastViewed = null;

function route() {
  const m = location.hash.match(/^#\/a\/([\w-]+)$/);
  const app = m && APPS.find((a) => a.slug === m[1]);
  if (app) {
    lastViewed = app.slug;
    showDetail(app);
    return;
  }
  showHome();
  if (location.hash === "#catalog") {
    lastViewed = null;
    $("catalog").querySelector(".section-head").scrollIntoView({ block: "start" });
  } else if (location.hash === "#pack") {
    lastViewed = null;
    setTimeout(() => $("pack").scrollIntoView({ block: "start" }), 0);
  } else if (lastViewed) {
    const slug = lastViewed;
    lastViewed = null;
    setTimeout(() => focusCard(slug), 0);
  } else {
    window.scrollTo(0, 0);
  }
}

/* ---------- package builder ---------- */

const pack = $("pack");
const packList = $("packList");
const packCount = $("packCount");
const packDownload = $("packDownload");
const packPlatforms = $("packPlatforms");

function renderPack() {
  const list = APPS.filter(hasFor);
  packList.innerHTML = list.map((a) => {
    const p = pickFor(a);
    const ext = fileTag(p);
    return `<label class="pk" style="--accent:${a.accent}">
      <input type="checkbox" value="${a.slug}"${state.picked.has(a.slug) ? " checked" : ""}>
      <span class="pk__check"></span>
      ${logo(a, "pk__logo")}
      <span class="pk__text"><span class="pk__name">${a.name}</span><span class="hint">${a.hint}</span></span>
      <span class="pk__ext">${ext}</span>
    </label>`;
  }).join("");
  pack.querySelector(".pack__hint").textContent =
    state.os === "mac"
      ? `${list.length} ${plural(list.length, "приложение", "приложения", "приложений")} с версией для macOS`
      : `${list.length} ${plural(list.length, "приложение", "приложения", "приложений")} для Windows 11`;
  updatePackFooter();
}

function updatePackFooter() {
  const n = [...state.picked].filter((slug) => {
    const app = APPS.find((a) => a.slug === slug);
    return app && hasFor(app);
  }).length;
  packCount.textContent = n;
  packDownload.disabled = n === 0;
}

packList.addEventListener("change", (e) => {
  const box = e.target.closest("input[value]");
  if (!box) return;
  box.checked ? state.picked.add(box.value) : state.picked.delete(box.value);
  updatePackFooter();
});

packPlatforms.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-os]");
  if (!btn || btn.dataset.os === state.os) return;
  state.os = btn.dataset.os;
  packPlatforms.querySelectorAll("button").forEach((b) => b.classList.toggle("is-active", b === btn));
  renderPack();
});

$("packToggle").addEventListener("click", () => {
  state.expanded = !state.expanded;
  pack.classList.toggle("pack--open", state.expanded);
  $("packToggleLabel").textContent = state.expanded ? "Свернуть" : "Развернуть";
  if (state.expanded) pack.scrollIntoView({ block: "start", behavior: "smooth" });
});

/* ---------- downloads ---------- */

const modal = $("modal");
const modalTitle = $("modalTitle");
const modalText = $("modalText");
const modalOk = $("modalOk");
let pending = [];

function ask(title, text, files) {
  modalTitle.textContent = title;
  modalText.textContent = text;
  pending = files;
  modal.hidden = false;
  requestAnimationFrame(() => modal.classList.add("show"));
  modalOk.focus();
}

function closeModal() {
  modal.classList.remove("show");
  setTimeout(() => (modal.hidden = true), 200);
  pending = [];
}

function save(file) {
  if (file.page) return window.open(file.url, "_blank", "noopener");
  const a = document.createElement("a");
  a.href = file.url;
  a.download = "";
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

modal.addEventListener("click", (e) => {
  if (e.target.closest("[data-close]")) return closeModal();
  if (e.target.closest("#modalOk")) {
    const files = pending;
    closeModal();
    files.forEach((f, i) => setTimeout(() => save(f), 90 + i * 700));
    if (files.length > 1) showToast(`Скачиваем ${files.length} файлов — браузер спросит по каждому.`);
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.hidden) closeModal();
});

/* ---------- screenshot lightbox ---------- */

const lightbox = $("lightbox");
const lightboxImg = $("lightboxImg");
const lightboxCap = $("lightboxCap");
let lbList = [];
let lbIndex = 0;

function drawLightbox() {
  lightboxImg.src = lbList[lbIndex];
  lightboxCap.textContent = `${lbIndex + 1} / ${lbList.length}`;
  const one = lbList.length < 2;
  lightbox.querySelector("[data-lb-prev]").disabled = one;
  lightbox.querySelector("[data-lb-next]").disabled = one;
}

function openLightbox(list, index) {
  if (!list.length) return;
  lbList = list;
  lbIndex = Math.max(0, Math.min(index, list.length - 1));
  drawLightbox();
  lightbox.hidden = false;
  requestAnimationFrame(() => lightbox.classList.add("show"));
}

function closeLightbox() {
  lightbox.classList.remove("show");
  setTimeout(() => {
    lightbox.hidden = true;
    lightboxImg.removeAttribute("src");
  }, 200);
}

function stepLightbox(dir) {
  if (lbList.length < 2) return;
  lbIndex = (lbIndex + dir + lbList.length) % lbList.length;
  drawLightbox();
}

detail.addEventListener("click", (e) => {
  const shot = e.target.closest(".album__shot");
  if (!shot) return;
  openLightbox(JSON.parse(detail.dataset.shots || "[]"), Number(shot.dataset.shot));
});

lightbox.addEventListener("click", (e) => {
  if (e.target.closest("[data-lb-close]")) closeLightbox();
  else if (e.target.closest("[data-lb-prev]")) stepLightbox(-1);
  else if (e.target.closest("[data-lb-next]")) stepLightbox(1);
});

document.addEventListener("keydown", (e) => {
  if (lightbox.hidden) return;
  if (e.key === "Escape") closeLightbox();
  else if (e.key === "ArrowLeft") stepLightbox(-1);
  else if (e.key === "ArrowRight") stepLightbox(1);
});

function requestDownload(app, os) {
  const p = os === "mac" ? app.mac : app.win;
  if (!p) return;
  const page = isPage(p);
  ask(
    `Скачать ${app.name}?`,
    page
      ? `Откроется официальная страница загрузки ${p.file}. Файл выбираешь там же.`
      : `Официальный файл ${p.file} — ${os === "mac" ? "macOS" : "Windows 11"}. Скачивается напрямую с сайта проекта.`,
    [{ url: p.url, name: p.file, page }]
  );
}

document.addEventListener("click", (e) => {
  const dl = e.target.closest("[data-dl]");
  if (!dl) return;
  const app = APPS.find((a) => a.slug === dl.dataset.dl);
  if (app) requestDownload(app, dl.dataset.os);
});

packDownload.addEventListener("click", () => {
  const chosen = APPS.filter((a) => state.picked.has(a.slug) && hasFor(a));
  if (!chosen.length) return;
  ask(
    `Скачать ${chosen.length} приложений?`,
    "Браузер скачает файлы по очереди с официальных сайтов. Если хочешь один архив — скачивай по одному.",
    chosen.map((a) => {
      const p = pickFor(a);
      return { url: p.url, name: p.file, page: isPage(p) };
    })
  );
});

/* ---------- toast ---------- */

let toastTimer;
function showToast(text) {
  toast.textContent = text;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
}

/* ---------- toolbar events ---------- */

filters.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-cat]");
  if (!btn) return;
  state.cat = btn.dataset.cat;
  filters.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
  render();
});

searchInput.addEventListener("input", () => {
  state.q = searchInput.value;
  render();
});

$("reset").addEventListener("click", () => {
  state.cat = "all";
  state.q = "";
  searchInput.value = "";
  filters.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.cat === "all")));
  render();
});

grid.addEventListener("pointermove", (e) => {
  const c = e.target.closest(".card");
  if (!c) return;
  const r = c.getBoundingClientRect();
  c.style.setProperty("--mx", `${e.clientX - r.left}px`);
  c.style.setProperty("--my", `${e.clientY - r.top}px`);
});

document.addEventListener("keydown", (e) => {
  if (!detail.hidden) return;
  const typing = /^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName);
  if ((e.key === "/" && !typing) || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k")) {
    e.preventDefault();
    searchInput.focus();
    searchInput.select();
  }
  if (e.key === "Escape" && document.activeElement === searchInput) {
    searchInput.value = "";
    state.q = "";
    searchInput.blur();
    render();
  }
});

window.addEventListener("hashchange", route);

// повторный клик по «Каталог» с уже открытым #catalog не меняет хеш — прокручиваем вручную
document.querySelectorAll('.topbar__nav a[href="#catalog"]').forEach((a) =>
  a.addEventListener("click", () => {
    if (location.hash === "#catalog") {
      $("catalog").querySelector(".section-head").scrollIntoView({ block: "start" });
    }
  })
);

$("heroCount").textContent = `${APPS.length} ${plural(APPS.length, "инструмент", "инструмента", "инструментов")}`;
$("count").textContent = APPS.length;
renderFilters();
renderTickers();
render();
renderPack();
route();
