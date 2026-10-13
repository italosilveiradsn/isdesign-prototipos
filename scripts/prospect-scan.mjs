// Uso: node scripts/prospect-scan.mjs --in prospects.csv [--out work/prospects.tsv] [--key CHAVE] [--no-psi] [--delay 1500]
// Triagem em lote de sites de prospects (docs/isdesign/pesquisa-nichos-eua.md §8.3): abre a home de cada um uma vez, extrai sinais do HTML,
// consulta o PageSpeed Insights (com --key ou PSI_KEY; sem chave só os sinais de HTML) e ordena por nota. Nota >= 6 = vale construir protótipo.
// --rea: além do HTML, pede ao agente REA a inspeção passiva da página (scripts/rea-site.mjs) para detectar tag de anúncio (Google Ads, Meta, TikTok, call tracking) = "anuncia" (+2).
// Entrada: uma URL por linha, ou CSV/TSV com cabeçalho `url,name,ads,reviews,rating,owner,years,franchise` (colunas extras opcionais).
import { execFile } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { promisify } from "node:util";
import { dirname } from "node:path";
import { fetchPsi } from "../src/leads/psi.mjs";
import { BUILD_THRESHOLD, htmlSignals, parseProspects, scoreProspect } from "../src/leads/signals.mjs";

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > 0 ? process.argv[i + 1] : d; };
const input = arg("in"); if (!input) { console.error("faltou --in <arquivo>"); process.exit(1); }
const out = arg("out", "work/prospects.tsv"), delay = +arg("delay", 1500), key = arg("key", process.env.PSI_KEY);
let usePsi = !process.argv.includes("--no-psi");
if (usePsi && !key) { console.error("Sem chave PSI: usando só os sinais do HTML. Para a nota de velocidade: --key ou PSI_KEY (Google Cloud, grátis).\n"); usePsi = false; }
const useRea = process.argv.includes("--rea");
const runNode = promisify(execFile);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function openHome(url) {
  const res = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(15_000), headers: { "user-agent": "Mozilla/5.0 (compatible; site-audit)", accept: "text/html" } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return { html: (await res.text()).slice(0, 2_000_000), finalUrl: res.url || url };
}

const rows = [];
for (const p of parseProspects(await readFile(input, "utf8"))) {
  const row = { ...p, psi: null, signals: null, error: "" };
  try {
    const { html, finalUrl } = await openHome(p.url);
    row.signals = htmlSignals(html, finalUrl);
    if (useRea) {
      try {
        row.rea = JSON.parse((await runNode("node", [new URL("./rea-site.mjs", import.meta.url).pathname, finalUrl], { timeout: 180_000, maxBuffer: 8 << 20 })).stdout);
        if (row.rea.anuncia && !/^(s|sim|y|yes|1|true)$/i.test(String(p.ads ?? "").trim())) p.ads = "sim"; // sinal do REA preenche a coluna ads quando o CSV não disse
      } catch (e) { row.error = `rea: ${e.message.split("\n")[0]}`; }
    }
    if (usePsi) {
      try { row.psi = await fetchPsi(finalUrl, { key }); }
      catch (e) { row.error = e.message; if (/cota|429/i.test(e.message)) usePsi = false; console.error(`${p.url}: ${e.message}`); }
      await sleep(delay);
    }
  } catch (e) { row.error = `não abriu: ${e.message}`; }
  if (row.signals) Object.assign(row, scoreProspect({ psi: row.psi, signals: row.signals, manual: p }));
  else Object.assign(row, { score: 0, build: false, reasons: [row.error] });
  rows.push(row);
  console.error(`${String(row.score).padStart(3)}  ${p.url}`);
}

rows.sort((a, b) => b.score - a.score);
const cols = ["nota", "construir", "url", "nome", "psi_mobile", "lcp_s", "cls", "https", "tel", "cms", "copyright", "agencia", "anuncia", "motivos", "erro"];
const lines = rows.map((r) => [
  r.score, r.build ? "SIM" : "não", r.url, r.name ?? "", r.psi ? Math.round(r.psi.perf * 100) : "", r.psi?.lcpMs ? (r.psi.lcpMs / 1000).toFixed(1) : "",
  r.psi?.cls != null ? r.psi.cls.toFixed(2) : "", r.signals?.https ?? "", r.signals?.tel ?? "", r.signals?.cms ?? "", r.signals?.year ?? "", r.signals?.agency ?? "", r.rea ? (r.rea.ads.join("+") || "não") : "",
  r.reasons.join("; "), r.error,
].join("\t"));
await mkdir(dirname(out), { recursive: true });
await writeFile(out, [cols.join("\t"), ...lines].join("\n") + "\n");
console.log(`\n${rows.length} sites, ${rows.filter((r) => r.build).length} com nota >= ${BUILD_THRESHOLD} (construir protótipo). Saída: ${out}`);
