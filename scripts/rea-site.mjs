// Uso: node scripts/rea-site.mjs <url> [--port 9333] [--ms 3000]
// Abre a home pública num Chromium local (porta de depuração em 127.0.0.1) e pede ao agente REA (rea-agents) a inspeção PASSIVA da página:
// imprime em JSON os sinais de src/leads/rea.mjs (tags de anúncio, widgets, origens de terceiros). Sem login, sem formulário, sem burlar nada.
// Requer: Chromium/Chrome (CHROME_BIN ou o do Playwright em /opt/pw-browsers) e `npx` (baixa rea-agents@6.4.0, a versão do .mcp.json).
import { spawn, execFile } from "node:child_process";
import { promisify } from "node:util";
import { existsSync, readdirSync } from "node:fs";
import { reaSignals } from "../src/leads/rea.mjs";

const run = promisify(execFile);
const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > 0 ? process.argv[i + 1] : d; };
const url = process.argv[2]; if (!url || url.startsWith("--")) { console.error("uso: rea-site.mjs <url>"); process.exit(1); }
const port = +arg("port", 9333), ms = arg("ms", "3000"), REA = ["-y", "rea-agents@6.4.0"];
const base = `http://127.0.0.1:${port}`;
const sleep = (t) => new Promise((r) => setTimeout(r, t));

function findChrome() {
  if (process.env.CHROME_BIN) return process.env.CHROME_BIN;
  for (const d of existsSync("/opt/pw-browsers") ? readdirSync("/opt/pw-browsers") : []) {
    const p = `/opt/pw-browsers/${d}/chrome-linux/chrome`; if (d.startsWith("chromium-") && existsSync(p)) return p;
  }
  return "google-chrome";
}

let chrome = null;
const up = async () => fetch(`${base}/json/version`).then((r) => r.ok).catch(() => false);
if (!(await up())) {
  chrome = spawn(findChrome(), ["--headless=new", "--no-sandbox", `--remote-debugging-port=${port}`, "--user-data-dir=" + (process.env.TMPDIR ?? "/tmp") + `/rea-profile-${port}`, "about:blank"], { stdio: "ignore" });
  for (let i = 0; i < 30 && !(await up()); i++) await sleep(300);
}
try {
  const created = await fetch(`${base}/json/new?${encodeURIComponent(url)}`, { method: "PUT" }).then((r) => r.json());
  await sleep(+ms);
  const rea = async (...a) => JSON.parse((await run("npx", [...REA, ...a, "--format", "json"], { maxBuffer: 64 * 1024 * 1024, timeout: 120_000 })).stdout);
  const list = (await rea("list-browser-targets", base)).normalized_result.targets;
  const t = list.find((x) => x.target_id === created.id) ?? list[list.length - 1];
  if (!t) throw new Error("REA não listou a página (URL não carregou?)");
  const ev = await rea("inspect-web-page", base, t.target_id, "--observation-ms", ms);
  console.log(JSON.stringify(reaSignals(ev), null, 2));
} finally { chrome?.kill(); }
