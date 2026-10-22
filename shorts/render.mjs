// 쓰는 법: node shorts/render.mjs <쇼츠 폴더> <장면 수> [파일 이름 뒤에 붙일 말, 예: _수정]
// 폴더 안의 scenes.html#1, #2 … 를 크롬으로 열어 01.png, 02.png … (1080×1920)로 저장한다.
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import path from "node:path";
const dir = path.resolve(process.argv[2]);
const chrome = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const url = pathToFileURL(path.join(dir, "scenes.html")).href;
for (let i = 1; i <= Number(process.argv[3] || 9); i++) {
  const out = path.join(dir, String(i).padStart(2, "0") + (process.argv[4] || "") + ".png");
  execFileSync(chrome, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files",
    "--force-device-scale-factor=1", "--window-size=1080,1920", "--virtual-time-budget=3000",
    `--screenshot=${out}`, `${url}#${i}`], { stdio: "ignore" });
  console.log(out);
}
