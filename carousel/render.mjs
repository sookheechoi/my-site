// 쓰는 법: node carousel/render.mjs <게시물 폴더> <장 수>
// 폴더 안의 slides.html#1, #2 … 를 크롬으로 열어 01.png, 02.png … 로 저장한다.
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import path from "node:path";
const dir = process.argv[2];
const chrome = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const url = pathToFileURL(path.join(dir, "slides.html")).href;
for (let i = 1; i <= Number(process.argv[3] || 9); i++) {
  const out = path.join(dir, String(i).padStart(2, "0") + ".png");
  execFileSync(chrome, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files",
    "--force-device-scale-factor=1", "--window-size=1080,1350", "--virtual-time-budget=3000",
    `--screenshot=${out}`, `${url}#${i}`], { stdio: "ignore" });
  console.log(out);
}
