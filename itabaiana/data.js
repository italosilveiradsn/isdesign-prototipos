/* DADOS DO SITE — edite só este arquivo (ou troque por uma API) e tudo atualiza.
   exemplo:true = demonstração. Troque pelos dados oficiais do clube/federação e ponha exemplo:false. */
window.DATA={
  exemplo:true,
  temporada:"2026",
  formacaoPadrao:"4-3-3",
  /* Contatos e redes: preencha e os botões do site passam a funcionar sozinhos.
     whatsapp: só números com DDI (ex.: 5579999999999). Redes: usuário ou URL completa. */
  contato:{whatsapp:"5547988936959",email:"",instagram:"itabaianaoficial",facebook:"https://www.facebook.com/itabaiana.aoi/",youtube:"https://www.youtube.com/@AOItabaiana",tiktok:"",x:"",loja:"lojatremendao"},
  /* Programa oficial de sócio: dados copiados de https://sociotremendao.com.br/planos em 16/10/2026. Reconfira antes de publicar. */
  socio:{
    site:"https://sociotremendao.com.br/planos",regulamento:"https://sociotremendao.com.br/termos-de-uso",vantagens:"https://sociotremendao.com.br/rede-de-vantagens",
    operador:"Programa Sócio Tremendão, plataforma Torcedor de Vantagens (Grupo Dataclick)",atualizado:"16/10/2026",
    sede:"Av. Ivo de Carvalho, 46, Centro, Itabaiana, SE",
    taxaKit:"Taxa de R$ 25,00 na primeira parcela pelo Welcome Kit (carteirinha, certificado e adesivo). Com carteirinha digital, não há taxa.",
    pagamento:"Cartão de crédito, débito recorrente, boleto e Pix.",
    passos:[["Escolha o plano","No site oficial do programa, em “Escolha seu plano”."],["Faça o cadastro","Online, com CPF e e-mail pessoal válidos. Também dá para ir à sede."],["Pague a primeira parcela","Mais a taxa do Welcome Kit, se optar pela carteirinha física."],["Receba a carteirinha","Ela vale como ingresso e identidade nos jogos."]],
    planos:[
      {id:"bronze",nome:"Tremendão de Bronze",mensal:30,vista:324,anual:360,cor:"#8a5a2b",itens:["Ingressos a R$ 20,00 na arquibancada descoberta nos jogos com mando do clube","App oficial Sócio Tremendão","Clube de Vantagens","Sorteios exclusivos","10% de desconto em produtos oficiais","Central de atendimento pelo site do programa"]},
      {id:"prata",nome:"Tremendão de Prata",mensal:60,vista:648,anual:720,cor:"#8b95a8",itens:["Acesso livre à arquibancada descoberta nos jogos com mando do clube","1 dependente Prata Futuro (menor de 12 anos) por + R$ 10,00 por mês","App oficial Sócio Tremendão","Clube de Vantagens","Sorteios, experiências e ações exclusivas","10% de desconto em produtos oficiais","Central de atendimento pelo site do programa"]},
      {id:"feminino",nome:"Tremendão Feminino",mensal:30,vista:324,anual:null,cor:"#c2185b",itens:["Acesso livre à arquibancada descoberta nos jogos com mando do clube","App oficial Sócio Tremendão","Clube de Vantagens","Sorteios, experiências e ações exclusivas","10% de desconto em produtos oficiais","Central de atendimento pelo site do programa"]},
      {id:"ouro",nome:"Tremendão de Ouro",mensal:100,vista:1080,anual:1200,cor:"#b8860b",destaque:true,itens:["Acesso livre à cadeira nos jogos com mando do clube","1 camisa oficial (retirada imediata no pagamento à vista; após 180 dias no parcelado)","1 dependente Prata Futuro (menor de 12 anos) por + R$ 10,00 por mês","App oficial Sócio Tremendão","Clube de Vantagens","Sorteios, experiências e ações exclusivas","15% de desconto em produtos oficiais","Central de atendimento pelo site do programa"]}
    ],
    confirmar:["Valor anual do plano Feminino no cartão e no boleto (R$ 600,00 no site; 12 x R$ 30,00 daria R$ 360,00).","Desconto em produtos oficiais do plano Bronze: 10% na página de planos, 5% no regulamento.","Número de WhatsApp: é o atendimento do programa (operadora), com DDD 47. Confirmar se o clube quer um número local."]
  },
  competicoes:[
    {id:"sergipano",nome:"Campeonato Sergipano",tipo:"tabela",
     tabela:[["Time A",10,6,2,2,14,7],["Time B",10,5,3,2,12,8],["Itabaiana",10,5,2,3,13,9],["Time C",10,4,3,3,10,9],["Time D",10,3,4,3,9,9],["Time E",10,3,2,5,8,12],["Time F",10,2,3,5,7,12],["Time G",10,1,3,6,5,13]]},
    {id:"prene",nome:"Pré-Copa do Nordeste",tipo:"mata",
     confrontos:[{fase:"Fase única",a:"Itabaiana",b:"Time H",ida:"1 x 0",volta:"2 x 2",status:"Classificado"}]},
    {id:"cne",nome:"Copa do Nordeste",tipo:"tabela",
     tabela:[["Time I",4,3,0,1,7,3],["Itabaiana",4,2,1,1,5,4],["Time J",4,1,2,1,4,4],["Time K",4,0,1,3,2,7]]},
    {id:"cdb",nome:"Copa do Brasil · fase eliminatória",tipo:"mata",
     confrontos:[{fase:"1ª fase",a:"Itabaiana",b:"Time L",ida:"2 x 1",volta:"0 x 0",status:"Classificado"},{fase:"2ª fase",a:"Time M",b:"Itabaiana",ida:"a definir",volta:"a definir",status:"A disputar"}]},
    {id:"serieD",nome:"Série D",tipo:"tabela",
     tabela:[["Time N",2,2,0,0,5,1],["Itabaiana",2,1,1,0,3,1],["Time O",2,1,0,1,2,2],["Time P",2,0,1,1,1,3],["Time Q",2,0,0,2,0,4]]}
  ],
  jogos:[
    {d:"2026-10-04",h:"16:00",comp:"Campeonato Sergipano",casa:"Itabaiana",fora:"Time A",gc:2,gf:0,local:"Mendonção"},
    {d:"2026-10-11",h:"19:30",comp:"Copa do Nordeste",casa:"Time B",fora:"Itabaiana",gc:1,gf:1,local:"Estádio do Time B"},
    {d:"2026-10-14",h:"16:00",comp:"Campeonato Sergipano",casa:"Itabaiana",fora:"Confiança",gc:0,gf:1,local:"Mendonção"},
    {d:"2026-11-01",h:"16:00",comp:"Série D",casa:"Itabaiana",fora:"Time D",local:"Mendonção"},
    {d:"2026-11-08",h:"19:30",comp:"Copa do Brasil",casa:"Time E",fora:"Itabaiana",local:"Estádio do Time E"},
    {d:"2026-11-15",h:"16:00",comp:"Série D",casa:"Itabaiana",fora:"Time F",local:"Mendonção"},
    {d:"2026-11-22",h:"20:00",comp:"Série D",casa:"Time G",fora:"Itabaiana",local:"Estádio do Time G"}
  ],
  elenco:[
    {n:1,nome:"Goleiro 01",g:"Goleiros"},{n:12,nome:"Goleiro 12",g:"Goleiros"},{n:22,nome:"Goleiro 22",g:"Goleiros"},
    {n:2,nome:"Lateral 02",g:"Defensores"},{n:3,nome:"Zagueiro 03",g:"Defensores"},{n:4,nome:"Zagueiro 04",g:"Defensores"},{n:6,nome:"Lateral 06",g:"Defensores"},{n:13,nome:"Zagueiro 13",g:"Defensores"},{n:14,nome:"Lateral 14",g:"Defensores"},{n:15,nome:"Zagueiro 15",g:"Defensores"},{n:16,nome:"Lateral 16",g:"Defensores"},
    {n:5,nome:"Volante 05",g:"Meio-campistas"},{n:8,nome:"Meia 08",g:"Meio-campistas"},{n:10,nome:"Meia 10",g:"Meio-campistas"},{n:17,nome:"Volante 17",g:"Meio-campistas"},{n:18,nome:"Meia 18",g:"Meio-campistas"},{n:20,nome:"Meia 20",g:"Meio-campistas"},{n:21,nome:"Volante 21",g:"Meio-campistas"},
    {n:7,nome:"Ponta 07",g:"Atacantes"},{n:9,nome:"Atacante 09",g:"Atacantes"},{n:11,nome:"Ponta 11",g:"Atacantes"},{n:19,nome:"Atacante 19",g:"Atacantes"},{n:23,nome:"Ponta 23",g:"Atacantes"},{n:24,nome:"Atacante 24",g:"Atacantes"}
  ],
  /* escalação sugerida (números) na ordem dos espaços da formação: goleiro, defesa, meio, ataque */
  sugerido:[1,2,3,4,6,5,8,10,7,9,11],
  comissao:[
    {grupo:"Comissão técnica",cargo:"Treinador",nome:"A definir"},{grupo:"Comissão técnica",cargo:"Auxiliar técnico",nome:"A definir"},{grupo:"Comissão técnica",cargo:"Preparador físico",nome:"A definir"},{grupo:"Comissão técnica",cargo:"Auxiliar de preparador físico",nome:"A definir"},{grupo:"Comissão técnica",cargo:"Preparador de goleiros",nome:"A definir"},{grupo:"Comissão técnica",cargo:"Analista de desempenho",nome:"A definir"},
    {grupo:"Departamento médico",cargo:"Médico",nome:"A definir"},{grupo:"Departamento médico",cargo:"Fisioterapeuta",nome:"A definir"},{grupo:"Departamento médico",cargo:"Nutricionista",nome:"A definir"},{grupo:"Departamento médico",cargo:"Massagista",nome:"A definir"},
    {grupo:"Apoio e gestão",cargo:"Gerente de futebol",nome:"A definir"},{grupo:"Apoio e gestão",cargo:"Supervisor",nome:"A definir"},{grupo:"Apoio e gestão",cargo:"Roupeiro",nome:"A definir"},{grupo:"Apoio e gestão",cargo:"Massagista auxiliar",nome:"A definir"}
  ],
  noticias:[
    {d:"2026-10-15",cat:"Jogo",t:"Exemplo: Tremendão se prepara para o próximo jogo no Mendonção",img:"temporada-2021"},
    {d:"2026-10-12",cat:"Sócio",t:"Exemplo: novidades para o sócio-torcedor",img:"final-2012"},
    {d:"2026-10-09",cat:"Clube",t:"Exemplo: visita ao CT e treino aberto",img:"serie-c-2002"}
  ],
  /* Galerias: "torcida" = fotos gerais da arquibancada; "jogos" = um álbum por partida (alimentado depois do jogo). Troque as imagens de exemplo por fotos autorizadas. */
  galeriaTorcida:["q144","q117","q10","final-2012","serie-c-2002","vice-2002"],
  galeriasJogos:[
    {titulo:"Itabaiana x Confiança",data:"2026-10-14",comp:"Campeonato Sergipano",fotos:["ranking-2020","temporada-2021","final-2012","serie-c-2002","q110","vice-2002"]},
    {titulo:"Time B x Itabaiana",data:"2026-10-11",comp:"Copa do Nordeste",fotos:["temporada-2021","q117","q10"]},
    {titulo:"Itabaiana x Time A",data:"2026-10-04",comp:"Campeonato Sergipano",fotos:["final-2012","serie-c-2002","vice-2002","campeao-2005"]}
  ]
};
