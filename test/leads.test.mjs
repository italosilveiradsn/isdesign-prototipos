import test from "node:test";
import assert from "node:assert/strict";
import { htmlSignals, parseProspects, scoreProspect, BUILD_THRESHOLD } from "../src/leads/signals.mjs";
import { fetchPsi } from "../src/leads/psi.mjs";

const OLD_WP = `<html><head><link href="/wp-content/themes/x/style.css"></head><body><a href="/contato">Contato</a>
<footer>Copyright © 2017 Piscinas Ltda. Website design by Agência Foo</footer></body></html>`;
const MODERN = `<html><body><a href="tel:+15551234567">Ligue</a><img src="https://static.wixstatic.com/a.png">
<footer>&copy; 2024-2026 Acme · Powered by Wix</footer></body></html>`;

test("htmlSignals: CMS, ligação, copyright e rodapé de agência", () => {
  const a = htmlSignals(OLD_WP, "http://velho.com/");
  assert.deepEqual(a, { https: false, tel: false, cms: "wordpress", year: 2017, agency: true });
  const b = htmlSignals(MODERN, "https://novo.com/");
  assert.deepEqual(b, { https: true, tel: true, cms: "wix", year: 2026, agency: false }); // "Powered by Wix" não é agência; usa o ano mais novo da faixa
});

test("htmlSignals: agência só conta em texto visível (regressão: python.org tinha 'Powered by' em comentário HTML)", () => {
  const f = (footer) => htmlSignals(`<html><body><p>oi</p>${footer}</body></html>`, "https://a.com").agency;
  assert.equal(f("<!-- <a>Powered by PSF Community Infrastructure</a> -->"), false);
  assert.equal(f("<script>var s='Site by Foo'</script>"), false);
  assert.equal(f("<footer>Powered by Hospedagem X</footer>"), false);
  assert.equal(f("<footer>Marketing by Bar Digital</footer>"), true);
  assert.equal(f("<footer>Site design by Foo</footer>"), true);
});

test("scoreProspect: soma sinais automáticos e manuais, subtrai agência e franquia", () => {
  const s = htmlSignals(OLD_WP.replace("Website design by Agência Foo", ""), "http://velho.com/");
  const r = scoreProspect({ psi: { perf: 0.31 }, signals: s, year: 2026, manual: { ads: "sim", reviews: "120", rating: "4.7", owner: "João", years: "9" } });
  // psi +2, sem tel +1, sem https +1, wordpress +1, copyright 2017 +1, anuncia +2, reviews +1, dono +1, anos +1
  assert.equal(r.score, 11); assert.ok(r.build); assert.equal(r.reasons.length, 9);
  const ag = scoreProspect({ psi: { perf: 0.31 }, signals: htmlSignals(OLD_WP, "http://velho.com/"), year: 2026, manual: { franchise: "sim" } });
  assert.equal(ag.score, 2 + 1 + 1 + 1 + 1 - 3 - 2); assert.ok(!ag.build);
  assert.equal(scoreProspect({ psi: null, signals: htmlSignals(MODERN, "https://novo.com/"), year: 2026 }).score, 0);
  assert.equal(BUILD_THRESHOLD, 6);
});

test("parseProspects: lista simples e CSV com cabeçalho, aspas e comentários", () => {
  assert.deepEqual(parseProspects("# nota\nexemplo.com\nhttps://b.com/x\n"), [{ url: "https://exemplo.com" }, { url: "https://b.com/x" }]);
  const r = parseProspects('url,name,ads,reviews\nacme.com,"Acme, Inc",sim,120\n');
  assert.deepEqual(r, [{ url: "https://acme.com", name: "Acme, Inc", ads: "sim", reviews: "120" }]);
  assert.deepEqual(parseProspects("url\tname\nx.com\tX"), [{ url: "https://x.com", name: "X" }]);
  assert.deepEqual(parseProspects(""), []);
});

const ok = (perf) => ({ status: 200, ok: true, json: async () => ({ lighthouseResult: { categories: { performance: { score: perf } }, audits: { "largest-contentful-paint": { numericValue: 4200 }, "cumulative-layout-shift": { numericValue: 0.31 } } } }) });
const status = (code, error) => ({ status: code, ok: false, json: async () => ({ error }) });

test("fetchPsi: lê nota, LCP e CLS e envia a chave", async () => {
  let called;
  const r = await fetchPsi("https://a.com", { key: "K", fetchImpl: async (u) => { called = u; return ok(0.42); } });
  assert.deepEqual(r, { perf: 0.42, lcpMs: 4200, cls: 0.31 });
  assert.match(called, /key=K/); assert.match(called, /strategy=mobile/); assert.match(called, /url=https%3A%2F%2Fa\.com/);
});
test("fetchPsi: 429 sem chave explica como resolver; com chave tenta de novo e passa", async () => {
  await assert.rejects(fetchPsi("https://a.com", { fetchImpl: async () => status(429) }), /chave grátis/);
  const seq = [status(429), status(429), ok(0.9)]; const waits = [];
  const r = await fetchPsi("https://a.com", { key: "K", fetchImpl: async () => seq.shift(), sleep: async (ms) => waits.push(ms) });
  assert.equal(r.perf, 0.9); assert.deepEqual(waits, [2000, 4000]);
  await assert.rejects(fetchPsi("https://a.com", { key: "K", retries: 1, fetchImpl: async () => status(429), sleep: async () => {} }), /mesmo com chave/);
});
test("fetchPsi: erro HTTP e resposta sem nota viram erro claro", async () => {
  await assert.rejects(fetchPsi("x", { key: "K", fetchImpl: async () => status(400, { message: "Invalid URL" }) }), /HTTP 400 Invalid URL/);
  await assert.rejects(fetchPsi("x", { key: "K", fetchImpl: async () => ({ status: 200, ok: true, json: async () => ({}) }) }), /sem nota/);
});

import { reaSignals } from "../src/leads/rea.mjs";
test("reaSignals: tag de anúncio e widgets vêm das origens que a página carregou", () => {
  const ev = { normalized_result: { target: { url: "https://acme.com/", origin: "https://acme.com", title: "Acme" },
    resources: [{ url: "https://acme.com/a.css" }, { url: "https://www.googleadservices.com/pagead/conversion.js" }, { url: "https://connect.facebook.net/en_US/fbevents.js" }, { url: "https://embed.tawk.to/x" }],
    scripts: { items: [{ url: "https://www.googletagmanager.com/gtm.js?id=GTM-1" }] } } };
  const r = reaSignals(ev);
  assert.deepEqual(r.ads, ["google-ads", "meta-pixel"]); assert.equal(r.anuncia, true);
  assert.deepEqual(r.widgets, ["chat", "analytics"]); assert.equal(r.terceiros, 4);
  assert.equal(reaSignals({ normalized_result: { target: { origin: "https://b.com" }, resources: [{ url: "https://b.com/x.js" }] } }).anuncia, false);
});
