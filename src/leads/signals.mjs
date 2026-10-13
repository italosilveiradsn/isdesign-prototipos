// Triagem de prospects para redesign de site (docs/isdesign/pesquisa-nichos-eua.md §8.3): sinais do HTML da home + nota.
// Os pesos e limiares são os da §8.3.7 do documento e estão marcados [E] lá (estimativa, não medição): calibre com as respostas reais.

export const BUILD_THRESHOLD = 6; // §8.3.7: só construa protótipo para nota >= 6
const BUILDERS = /wordpress|wix|squarespace|weebly|godaddy|shopify|webflow|duda/i;
// "Powered by" fica de fora de propósito: costuma ser crédito de plataforma/hospedagem, e a penalidade (-3) derruba o prospect.
const AGENCY = /(?:web\s?(?:site|design)|site)\s+(?:design(?:ed)?\s+)?by\b|(?:designed|developed|built|marketing|seo)\s+by\b/gi;
const NOISE = /<!--[\s\S]*?-->|<script\b[\s\S]*?<\/script>|<style\b[\s\S]*?<\/style>/gi; // marcação comentada e código não é texto da página
const CMS = [
  ["wordpress", /wp-content|wp-includes|content=["']WordPress/i], ["weebly", /weebly\.com|editmysite\.com/i],
  ["wix", /wixstatic\.com|static\.parastorage\.com/i], ["squarespace", /squarespace/i], ["duda", /dudaone|multiscreensite/i],
  ["godaddy", /img\d*\.wsimg\.com|websites\.godaddy/i], ["shopify", /cdn\.shopify\.com/i], ["webflow", /webflow/i],
];

export function htmlSignals(html, url) {
  const raw = html; html = html.replace(NOISE, " "); // CMS usa o HTML bruto (wp-content aparece em <link>/<script>); o resto, só texto visível
  const tail = html.slice(-Math.max(4000, Math.floor(html.length * 0.25))); // rodapé fica no fim do documento
  const years = [...html.matchAll(/(?:©|&copy;|&#169;|copyright)[^<]{0,40}?((?:19|20)\d{2})(?:\s*[-–]\s*((?:19|20)\d{2}))?/gi)].flatMap((m) => [m[1], m[2]]).filter(Boolean).map(Number);
  const agency = [...tail.matchAll(AGENCY)].some((m) => !BUILDERS.test(tail.slice(m.index + m[0].length, m.index + m[0].length + 20)));
  return {
    https: /^https:/i.test(url), tel: /href\s*=\s*["']tel:/i.test(html),
    cms: CMS.find(([, re]) => re.test(raw))?.[0] ?? "outro", year: years.length ? Math.max(...years) : null, agency,
  };
}

// psi: {perf, lcpMs, cls} ou null (sem chave/erro). manual: colunas opcionais do CSV de entrada.
export function scoreProspect({ psi, signals: s, manual = {}, year = new Date().getFullYear() }) {
  const parts = [], add = (n, why) => parts.push([n, why]);
  if (psi && psi.perf < 0.5) add(2, `PageSpeed mobile ${Math.round(psi.perf * 100)}/100`);
  if (!s.tel) add(1, "sem botão de ligar (tel:)");
  if (!s.https) add(1, "sem HTTPS");
  if (["wordpress", "weebly", "godaddy"].includes(s.cms)) add(1, `CMS ${s.cms}`);
  if (s.year && year - s.year >= 3) add(1, `copyright ${s.year}`);
  if (s.agency) add(-3, "rodapé de agência (contrato prende o site)");
  const yes = (v) => /^(s|sim|y|yes|1|true)$/i.test(String(v ?? "").trim());
  if (yes(manual.ads)) add(2, "anuncia (paga clique para página ruim)");
  if (+manual.reviews >= 30 && +manual.reviews <= 400 && +manual.rating >= 4.3) add(1, `${manual.reviews} reviews, nota ${manual.rating}`);
  if (String(manual.owner ?? "").trim()) add(1, "dono identificado");
  if (+manual.years > 2) add(1, `empresa com ${manual.years} anos`);
  if (yes(manual.franchise)) add(-2, "franquia/rede");
  const score = parts.reduce((a, [n]) => a + n, 0);
  return { score, build: score >= BUILD_THRESHOLD, reasons: parts.map(([n, w]) => `${n > 0 ? "+" : ""}${n} ${w}`) };
}

function splitLine(line, d) {
  const out = []; let cur = "", q = false;
  for (const ch of line) {
    if (ch === '"') q = !q; else if (ch === d && !q) { out.push(cur); cur = ""; } else cur += ch;
  }
  return [...out, cur].map((x) => x.trim());
}
const asUrl = (u) => (/^https?:\/\//i.test(u) ? u : `https://${u}`);

// Entrada: uma URL por linha, ou CSV/TSV com cabeçalho (url, name, ads, reviews, rating, owner, years, franchise).
export function parseProspects(text) {
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter((l) => l && !l.startsWith("#"));
  if (!lines.length) return [];
  const d = lines[0].includes("\t") ? "\t" : ",";
  const head = splitLine(lines[0], d).map((h) => h.toLowerCase());
  if (head.includes("url")) {
    return lines.slice(1).map((l) => Object.fromEntries(splitLine(l, d).map((v, i) => [head[i], v]))).filter((r) => r.url).map((r) => ({ ...r, url: asUrl(r.url) }));
  }
  return lines.map((l) => ({ url: asUrl(l) }));
}
