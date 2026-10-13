# Tema WordPress: Casa Roofing (teste de conversão)

Conversão do protótipo estático `p/6HZhTfl0xkv` (Casa Roofing) para um tema de WordPress. O visual é o mesmo do protótipo; a diferença é que o cliente edita textos, fotos, cores e contatos pelo painel, sem mexer em código.

## Como instalar (num WordPress já existente)
1. No painel: **Aparência > Temas > Adicionar novo > Enviar tema**.
2. Escolha o arquivo `isdesign-casa-roofing.zip` e clique em **Instalar agora**, depois em **Ativar**.
3. Para editar: **Aparência > Personalizar**. As seções são: Business info, Home: top area, Services, Why us, Reviews, Areas and contact e Brand colors. A prévia ao vivo fica ao lado.

## O que é editável
Logo, telefone, e-mail, horário, licença, menu, todos os títulos e parágrafos, as 3 fotos de serviços, a foto principal, as 4 avaliações, os logos de marcas, as áreas atendidas e as 6 cores da marca. O aviso de "design concept" no topo pode ser desligado (desligue ao entregar para o cliente final).

## Formulário de contato
O formulário envia e-mail de verdade para o endereço definido em "Areas and contact" (vazio = e-mail do administrador do WordPress). Tem proteção contra robôs (campo escondido e verificação de segurança). Em hospedagem comum o e-mail pode cair no spam: instale um plugin de SMTP (por exemplo WP Mail SMTP) e teste um envio antes de entregar.

## O que foi testado (13/10/2026)
- WordPress mais recente, com banco SQLite, PHP 8.3, em ambiente local.
- Página igual ao protótipo: 0,0% de diferença visual no desktop e no celular, depois de duas melhorias propositais (os logos de financiamento não ficam mais esticados, e o formulário não mostra mais o aviso "visual only").
- Edição pelo painel Personalizar: abre sem erro e mostra todas as seções; alterar telefone, título, cor, tags e ligar/desligar o aviso reflete na página.
- Formulário: envia com dados válidos, recusa sem nome e sem e-mail ou telefone, ignora robô e recusa sem a verificação de segurança.
- Velocidade (Lighthouse, celular): 99 de desempenho, 100 de acessibilidade e 96 de boas práticas. O protótipo estático tira 100, 100 e 96.

## O que NÃO foi testado
- Hospedagem real com MySQL e envio real de e-mail.
- Outros temas ou plugins ativos ao mesmo tempo (plugins de cache, construtores de página etc.).
- O fluxo de importar o conteúdo para um site já com outras páginas.

## Limites do tema
É de uma página só (home). Páginas internas (sobre, serviços, contato) precisam de templates extras. As seções são fixas: o cliente edita o conteúdo, não reorganiza blocos.
