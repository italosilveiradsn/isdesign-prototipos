// Sinais de um site a partir da evidência passiva do REA (`rea inspect-web-page`): quais origens a página carrega.
// Só lê o que o navegador já baixou da própria home pública; não preenche formulário, não loga, não contorna nada.
const AD_TAGS = [
  ["google-ads", /googleadservices\.com|googleads\.g\.doubleclick\.net|\/gtag\/js\?id=AW-/i],
  ["meta-pixel", /connect\.facebook\.net\/[^/]*\/fbevents\.js/i],
  ["tiktok-pixel", /analytics\.tiktok\.com/i],
  ["call-tracking", /callrail\.com|calltrackingmetrics\.com|invoca\.net|whatconverts\.com/i],
];
const WIDGETS = [
  ["chat", /tawk\.to|livechatinc|intercom\.io|drift\.com|crisp\.chat|podium\.com|birdeye\.com/i],
  ["agendamento", /calendly\.com|acuityscheduling|housecallpro|servicetitan|jobber/i],
  ["analytics", /googletagmanager\.com|google-analytics\.com|hotjar\.com|clarity\.ms/i],
];

export function reaSignals(evidence) {
  const n = evidence?.normalized_result ?? evidence ?? {};
  const urls = [...(n.resources ?? []).map((r) => r.url), ...(n.scripts?.items ?? []).map((s) => s.url), ...(n.network?.requests ?? []).map((r) => r.url)].filter(Boolean);
  const pick = (list) => list.filter(([, re]) => urls.some((u) => re.test(u))).map(([k]) => k);
  const host = n.target?.origin ? new URL(n.target.origin).host : "";
  const thirdParty = [...new Set(urls.map((u) => { try { return new URL(u).host; } catch { return ""; } }).filter((h) => h && h !== host))];
  return {
    url: n.target?.url ?? "", title: n.target?.title ?? "", ads: pick(AD_TAGS), widgets: pick(WIDGETS),
    anuncia: pick(AD_TAGS).length > 0, recursos: urls.length, terceiros: thirdParty.length, completo: n.completeness?.status ?? "",
  };
}
