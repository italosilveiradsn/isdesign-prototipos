# Prospecção (agente `prospector-agent`)

Objetivo: achar negócios e agências cujo site está ruim o bastante para valer um protótipo, e vender o redesign.

## Como rodar

```bash
# 1) lista.csv: url,name,ads,reviews,rating,owner,years,franchise (só url já serve)
node scripts/prospect-scan.mjs --in lista.csv                 # só sinais do HTML
node scripts/prospect-scan.mjs --in lista.csv --key $PSI_KEY  # + PageSpeed mobile (chave grátis do Google Cloud)
node scripts/prospect-scan.mjs --in lista.csv --rea           # + REA: tag de anúncio (Google Ads/Meta/TikTok/call tracking)
node scripts/rea-site.mjs https://site-do-prospect.com        # só a leitura REA de um site (JSON)
node --test test/leads.test.mjs
```

Saída: `work/prospects.tsv` (fora do git), ordenado por nota. Nota >= 6 = construir protótipo.

## Nota (0 a ~13; pesos são estimativa, calibre com as respostas reais)

+2 PageSpeed mobile < 50 · +2 anuncia (coluna `ads` ou tag detectada pelo REA) · +1 sem `tel:` · +1 sem HTTPS · +1 CMS WordPress/Weebly/GoDaddy · +1 copyright com 3+ anos · +1 30–400 reviews e nota >= 4,3 · +1 dono identificado · +1 empresa com 2+ anos · −3 rodapé de agência · −2 franquia/rede.

## O papel do REA

O REA (Reverse Engineer Anything, `rea-agents@6.4.0`, registrado em `.mcp.json`) faz a inspeção passiva da home num navegador local: lista scripts, recursos e origens carregadas, sem executar nada no alvo além de abrir a página pública. O que ele acrescenta ao HTML estático: sites montados por JavaScript (Wix, Duda, Webflow) e tags de anúncio carregadas por gerenciador de tags. Limites: não vê o que acontece antes de anexar, só a home, e nunca guarda cookies, corpos de resposta ou valores de storage.

## Fontes de leads (legais) e o que não fazer

- Lista colada pelo Ítalo, diretórios do setor, associações, câmaras de comércio, páginas "best of", registros públicos (BrasilAPI para consultar CNPJ conhecido).
- Não fazer scraping de Google Maps nem guardar conteúdo da Places API; consulta no Maps é manual.
- Protótipo: `noindex`, faixa "conceito, sem vínculo com a empresa", retirar em 24 h se pedirem.
- Nada de promessa de resultado. Dados de prospect ficam em `work/` (no `.gitignore`).

Vazão realista: triagem 20–30 sites/hora; o gargalo é o protótipo (15–25/semana individual; 40–50 com template).
