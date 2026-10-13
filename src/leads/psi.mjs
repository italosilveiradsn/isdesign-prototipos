// Cliente da PageSpeed Insights API v5 (gratuita, exige chave própria do Google Cloud para uso em lote).
// Sem chave a cota diária é compartilhada entre todos os anônimos e costuma estar esgotada (HTTP 429).
const ENDPOINT = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export async function fetchPsi(url, { key, strategy = "mobile", fetchImpl = fetch, retries = 2, sleep = wait } = {}) {
  const q = new URLSearchParams({ url, strategy, category: "performance" });
  if (key) q.set("key", key);
  for (let attempt = 0; ; attempt++) {
    const res = await fetchImpl(`${ENDPOINT}?${q}`, { signal: AbortSignal.timeout(90_000) });
    if (res.status === 429) {
      if (!key) throw new Error("PSI: cota anônima esgotada (429). Crie uma chave grátis (Google Cloud → PageSpeed Insights API) e use --key ou PSI_KEY.");
      if (attempt >= retries) throw new Error("PSI: 429 mesmo com chave; reduza o ritmo (--delay) ou espere a cota renovar.");
      await sleep(2000 * 2 ** attempt); continue;
    }
    const body = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(`PSI: HTTP ${res.status} ${body.error?.message ?? ""}`.trim());
    const lh = body.lighthouseResult, perf = lh?.categories?.performance?.score;
    if (typeof perf !== "number") throw new Error("PSI: resposta sem nota de performance");
    return { perf, lcpMs: lh.audits?.["largest-contentful-paint"]?.numericValue ?? null, cls: lh.audits?.["cumulative-layout-shift"]?.numericValue ?? null };
  }
}
