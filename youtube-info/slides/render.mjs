// 쓰는 법: node youtube-info/slides/render.mjs <슬라이드 폴더> <장 수>
// 폴더 안의 slides.html#1, #2 … 를 크롬으로 열어 01.png, 02.png … (1920×1080)로 저장한다.
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import path from "node:path";
const dir = process.argv[2];
const chrome = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const url = pathToFileURL(path.join(dir, "slides.html")).href;
for (let i = 1; i <= Number(process.argv[3] || 1); i++) {
  const out = path.join(dir, String(i).padStart(2, "0") + ".png");
  execFileSync(chrome, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files",
    "--force-device-scale-factor=1", "--window-size=1920,1080", "--virtual-time-budget=3000",
    `--screenshot=${out}`, `${url}#${i}`], { stdio: "ignore" });
  console.log(out);
}
