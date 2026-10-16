(function(){
var D=window.DATA,H=window.HIST,app=document.getElementById("app");
var MES=["JAN","FEV","MAR","ABR","MAI","JUN","JUL","AGO","SET","OUT","NOV","DEZ"],DIA=["DOM","SEG","TER","QUA","QUI","SEX","SÁB"];
var LOGO="escudo.png",MINI="escudo-liso.png";
/* formações: cada espaço = [x%, y%, rótulo] (topo = ataque) */
var DEF4=[[14,72],[37,77],[63,77],[86,72]];
var FORM={
 "4-3-3":[[50,90]].concat(DEF4,[[26,48],[50,58],[74,48]],[[17,21],[50,14],[83,21]]),
 "4-4-2":[[50,90]].concat(DEF4,[[14,50],[38,56],[62,56],[86,50]],[[36,17],[64,17]]),
 "4-2-3-1":[[50,90]].concat(DEF4,[[36,62],[64,62]],[[17,38],[50,33],[83,38]],[[50,13]]),
 "3-5-2":[[50,90],[25,76],[50,79],[75,76],[10,52],[30,59],[50,50],[70,59],[90,52],[36,17],[64,17]],
 "3-4-3":[[50,90],[25,76],[50,79],[75,76],[14,53],[38,58],[62,58],[86,53],[17,21],[50,14],[83,21]],
 "5-3-2":[[50,90],[9,68],[29,76],[50,79],[71,76],[91,68],[26,48],[50,56],[74,48],[36,17],[64,17]],
 "4-1-4-1":[[50,90]].concat(DEF4,[[50,64]],[[14,44],[38,48],[62,48],[86,44]],[[50,13]]),
 "4-3-2-1":[[50,90]].concat(DEF4,[[26,56],[50,60],[74,56]],[[34,30],[66,30]],[[50,13]])
};
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function dt(g){return new Date(g.d+"T"+(g.h||"12:00")+":00")}
function me(n){return n==="Itabaiana"}
function crest(n){return me(n)?'<span class="tc"><img src="'+MINI+'" alt="" width="355" height="377"></span>':'<span class="tc" aria-hidden="true">'+esc(n.replace(/[^A-Za-zÀ-ÿ ]/g,"").split(" ").map(function(w){return w[0]}).join("").slice(0,3).toUpperCase())+'</span>'}
function played(g){return g.gc!=null}
function result(g){if(!played(g))return"";var my=me(g.casa)?g.gc:g.gf,op=me(g.casa)?g.gf:g.gc;return my>op?"w":my<op?"l":"e"}
var now=new Date(),jogos=D.jogos.slice().sort(function(a,b){return dt(a)-dt(b)});
var proximo=jogos.filter(function(g){return !played(g)&&dt(g)>=now})[0]||jogos.filter(function(g){return !played(g)})[0];
function fdate(g){return DIA[dt(g).getDay()]+" "+("0"+dt(g).getDate()).slice(-2)+" "+MES[dt(g).getMonth()]}
function fx(g){var c=result(g);return '<a class="fx '+c+'" href="#jogos"><div class="t"><span>'+esc(g.comp)+'</span><span>'+fdate(g)+(played(g)?"":" · "+g.h)+'</span></div>'+
 '<div class="row"><span class="tm">'+crest(g.casa)+esc(g.casa)+'</span><span class="sc">'+(played(g)?g.gc:"")+'</span></div><div class="row"><span class="tm">'+crest(g.fora)+esc(g.fora)+'</span><span class="sc">'+(played(g)?g.gf:"")+'</span></div></a>'}
function pts(r){return r[2]*3+r[3]}
function ordenada(t){return t.slice().sort(function(a,b){return pts(b)-pts(a)||(b[5]-b[6])-(a[5]-a[6])})}
/* ---------- contatos e redes ---------- */
var C=D.contato||{};
var REDES=[["whatsapp","WhatsApp"],["instagram","Instagram"],["facebook","Facebook"],["youtube","YouTube"],["tiktok","TikTok"],["x","X"],["loja","Loja Tremendão"],["email","E-mail"]];
function href(k,v,msg){if(!v)return"";if(k==="whatsapp")return"https://wa.me/"+v.replace(/\D/g,"")+(msg?"?text="+encodeURIComponent(msg):"");if(k==="email")return"mailto:"+v;if(/^https?:/.test(v))return v;var u=v.replace(/^@/,"");return{instagram:"https://instagram.com/",loja:"https://instagram.com/",facebook:"https://facebook.com/",youtube:"https://youtube.com/@",tiktok:"https://tiktok.com/@",x:"https://x.com/"}[k]+u}
function redesBtns(cls,msg){return REDES.map(function(r){var h=href(r[0],C[r[0]],r[0]==="whatsapp"?msg:"");return h?'<a class="'+cls+'" href="'+esc(h)+'" target="_blank" rel="noopener">'+r[1]+'</a>':'<span class="'+cls+' off" title="Link a definir" aria-disabled="true">'+r[1]+'</span>'}).join("")}
/* ---------- hero ---------- */
function hero(){var g=proximo,adv=me(g.casa)?g.fora:g.casa,ct=me(g.casa)?"EM CASA":"FORA DE CASA";
return '<section class="hero"><div class="bg"><img src="img/time-1971.jpg" alt="Elenco do Itabaiana, campeão do Nordeste em 1971"></div><p class="cap">Elenco campeão do Nordeste · 1971</p><div class="wrap main"><div class="shw"><img class="shield" src="'+LOGO+'" alt="Escudo da Associação Olímpica de Itabaiana" width="358" height="499"></div>'+
'<div><div class="lbl"><i>Próximo jogo</i><span class="eyebrow" style="color:#ffb4ad">'+esc(g.comp)+' · '+ct+'</span></div>'+
'<h1>Itabaiana<small>contra</small>'+esc(adv)+'</h1>'+
'<div class="meta"><span><b>'+DIA[dt(g).getDay()]+', '+dt(g).getDate()+' '+MES[dt(g).getMonth()]+'</b></span><span><b>'+g.h+'</b></span><span>'+esc(g.local)+'</span></div>'+
'<div class="cd" id="cd" aria-label="Contagem regressiva"></div>'+
'<div class="acts"><a class="btn" href="#jogos">Ingressos</a><a class="btn g" href="#jogos">Calendário completo</a></div></div></div>'+
'<div class="strip"><div class="wrap"><div class="hd"><h2>Jogos</h2><a href="#jogos">Ver todos →</a></div><div class="rail" tabindex="0">'+jogos.map(fx).join("")+'</div></div></div></section>'}
/* ---------- monte seu time ---------- */
var B={form:D.formacaoPadrao||"4-3-3",xi:[],sel:-1};
function inicial(){var s=D.sugerido||[],n=FORM[B.form].length;B.xi=[];for(var i=0;i<n;i++)B.xi.push(s[i]||null);B.sel=-1}
function player(n){return D.elenco.filter(function(p){return p.n===n})[0]}
function mudarForm(f){var colocados=B.xi.filter(function(x){return x!=null});B.form=f;B.xi=FORM[f].map(function(_,i){return colocados[i]||null});B.sel=-1}
function slotsHtml(){return FORM[B.form].map(function(c,i){var n=B.xi[i],p=n!=null&&player(n);
 return '<button class="pl'+(p?" fl":" em")+(B.sel===i?" on":"")+'" data-slot="'+i+'" style="left:'+c[0]+'%;top:'+c[1]+'%"'+(p?' draggable="true"':'')+' aria-label="'+(p?esc(p.nome)+", número "+p.n+". Toque para remover":"Posição vazia "+(i+1)+". Toque para escolher")+'">'+(p?p.n+'<em>'+esc(p.nome.split(" ")[0])+'</em>':'+')+'</button>'}).join("")}
function chipsHtml(){var gs=["Goleiros","Defensores","Meio-campistas","Atacantes"];return gs.map(function(g){return '<div class="cg"><h4>'+g+'</h4><div class="cc">'+D.elenco.filter(function(p){return p.g===g}).map(function(p){var u=B.xi.indexOf(p.n)>-1;return '<button class="ch'+(u?" used":"")+'" data-n="'+p.n+'" draggable="true"><b>'+p.n+'</b>'+esc(p.nome.replace(/ \d+$/,""))+'</button>'}).join("")+'</div></div>'}).join("")}
function builder(){inicial();
return '<section class="sec dk" id="monte"><div class="wrap"><div class="sh"><div><p class="eyebrow">Interaja</p><h2>Monte o seu time</h2></div><p class="lead">Escolha a formação, clique ou arraste os jogadores para o campo e compartilhe a sua escalação.</p></div>'+
'<div class="bld" id="bld"><div class="bl"><div class="forms" id="forms">'+Object.keys(FORM).map(function(f){return '<button data-f="'+f+'" class="'+(f===B.form?"on":"")+'">'+f+'</button>'}).join("")+'</div><div class="pitch" id="pitch"><svg viewBox="0 0 70 100" preserveAspectRatio="none" aria-hidden="true"><rect x="2" y="2" width="66" height="96"/><line x1="2" y1="50" x2="68" y2="50"/><circle cx="35" cy="50" r="9"/><rect x="16" y="2" width="38" height="16"/><rect x="25" y="2" width="20" height="6"/><rect x="16" y="82" width="38" height="16"/><rect x="25" y="92" width="20" height="6"/></svg><div id="slots">'+slotsHtml()+'</div></div></div>'+
'<div class="br"><div class="acts2"><button class="btn b" data-a="sug">Escalação sugerida</button><button class="btn g" data-a="clr">Limpar</button></div><div class="chips" id="chips">'+chipsHtml()+'</div>'+
'<div class="share"><p class="eyebrow dkk">Compartilhar</p><div class="acts2"><button class="btn" data-a="wa">WhatsApp</button><button class="btn g" data-a="x">X</button><button class="btn g" data-a="cp">Copiar escalação</button><button class="btn g" data-a="img">Gerar imagem</button></div><p id="msg" class="hint" role="status"></p></div></div></div></div></section>'}
function texto(){var l=FORM[B.form].map(function(_,i){var p=B.xi[i]!=null&&player(B.xi[i]);return p?p.n+" "+p.nome:null}).filter(Boolean);return "Meu time do Itabaiana ("+B.form+"):\n"+l.join("\n")+"\n#Tremendão #AOI"}
function refresh(){var s=document.getElementById("slots");if(s)s.innerHTML=slotsHtml();var c=document.getElementById("chips");if(c)c.innerHTML=chipsHtml();var f=document.getElementById("forms");if(f)[].forEach.call(f.children,function(b){b.classList.toggle("on",b.dataset.f===B.form)})}
function say(t){var m=document.getElementById("msg");if(m){m.textContent=t;clearTimeout(say.t);say.t=setTimeout(function(){m.textContent=""},3500)}}
function papeis(f){var nn=f.split("-").map(Number),r=["Goleiros"],i;for(i=0;i<nn[0];i++)r.push("Defensores");for(i=1;i<nn.length-1;i++)for(var j=0;j<nn[i];j++)r.push("Meio-campistas");for(i=0;i<nn[nn.length-1];i++)r.push("Atacantes");return r}
function livre(g){var r=papeis(B.form),k;for(k=0;k<B.xi.length;k++)if(B.xi[k]==null&&r[k]===g)return k;return B.xi.indexOf(null)}
function colocar(n,slot){var at=B.xi.indexOf(n);if(slot==null||slot<0){slot=B.sel>-1&&B.xi[B.sel]==null?B.sel:livre(player(n).g)}
 if(slot<0){say("Time completo. Toque em um jogador do campo para tirá-lo.");return}
 if(at>-1)B.xi[at]=B.xi[slot];B.xi[slot]=n;B.sel=-1;refresh()}
function modal(html){var m=document.createElement("div");m.className="modal";m.innerHTML='<div class="mb" role="dialog" aria-modal="true"><button class="mx" aria-label="Fechar">×</button>'+html+'</div>';function close(){m.remove();removeEventListener("keydown",k)}function k(e){if(e.key==="Escape")close()}m.addEventListener("click",function(e){if(e.target===m||e.target.className==="mx")close()});addEventListener("keydown",k);document.body.appendChild(m);m.querySelector(".mx").focus()}
function gerarImagem(){
 var F="'Barlow Condensed','Arial Narrow',Arial,sans-serif";
 var fonts=document.fonts&&document.fonts.load?Promise.all([document.fonts.load("800 84px 'Barlow Condensed'"),document.fonts.load("700 38px 'Barlow Condensed'"),document.fonts.load("600 30px 'Barlow Condensed'")]).catch(function(){}):Promise.resolve();
 var im=new Image();var loaded=new Promise(function(ok){im.onload=ok;im.onerror=ok});im.src=LOGO;
 Promise.all([fonts,loaded]).then(function(){
  var W=1080,Hh=1350,cv=document.createElement("canvas");cv.width=W;cv.height=Hh;var x=cv.getContext("2d");
  var g=x.createLinearGradient(0,0,0,Hh);g.addColorStop(0,"#0b1a4a");g.addColorStop(1,"#08123a");x.fillStyle=g;x.fillRect(0,0,W,Hh);
  if(im.naturalWidth){var ch=128,cw=ch*im.naturalWidth/im.naturalHeight;x.drawImage(im,60,40,cw,ch)}
  x.textAlign="left";x.textBaseline="alphabetic";x.fillStyle="#fff";x.font="800 84px "+F;x.fillText("MEU TIME",190,108);x.fillStyle="#ff8a80";x.font="700 38px "+F;x.fillText("ITABAIANA  \u00b7  "+B.form,190,156);
  var px=90,py=200,pw=900,ph=1000;x.fillStyle="#118a41";x.fillRect(px,py,pw,ph);for(var i=0;i<10;i+=2){x.fillStyle="#0f7a3a";x.fillRect(px,py+i*ph/10,pw,ph/10)}
  x.strokeStyle="rgba(255,255,255,.85)";x.lineWidth=4;x.strokeRect(px+20,py+20,pw-40,ph-40);x.beginPath();x.moveTo(px+20,py+ph/2);x.lineTo(px+pw-20,py+ph/2);x.stroke();x.beginPath();x.arc(px+pw/2,py+ph/2,90,0,7);x.stroke();x.strokeRect(px+pw*.23,py+20,pw*.54,160);x.strokeRect(px+pw*.23,py+ph-180,pw*.54,160);
  FORM[B.form].forEach(function(c,i){var p=B.xi[i]!=null&&player(B.xi[i]);var cx=px+c[0]/100*pw,cy=py+c[1]/100*ph;x.beginPath();x.arc(cx,cy,40,0,7);x.fillStyle=p?"#fff":"rgba(255,255,255,.25)";x.fill();x.lineWidth=7;x.strokeStyle="#0a3fc2";x.stroke();
   if(p){x.textAlign="center";x.fillStyle="#0b1a4a";x.font="800 44px "+F;x.fillText(String(p.n),cx,cy+15);x.fillStyle="#fff";x.font="700 28px "+F;x.fillText(p.nome.split(" ")[0].toUpperCase(),cx,cy+78)}});
  x.textAlign="left";x.fillStyle="#cdd6ff";x.font="600 30px "+F;x.fillText("Associa\u00e7\u00e3o Ol\u00edmpica de Itabaiana  \u00b7  #Tremend\u00e3o",90,1290);
  var url=cv.toDataURL("image/png");
  modal('<h3>Sua escala\u00e7\u00e3o</h3><img class="gen" alt="Imagem da escala\u00e7\u00e3o montada" src="'+url+'"><div class="acts2 mact"><button class="btn" data-m="share" hidden>Compartilhar imagem</button><a class="btn b" href="'+url+'" download="meu-time-itabaiana.png">Baixar imagem</a></div><p class="hint" style="color:#333">Se o bot\u00e3o n\u00e3o funcionar no seu aparelho: clique com o bot\u00e3o direito (ou segure o dedo) sobre a imagem e escolha salvar.</p>');
  var sh=document.querySelector('.modal [data-m="share"]');
  if(sh&&navigator.canShare&&navigator.share&&cv.toBlob){cv.toBlob(function(bl){if(!bl)return;var f=new File([bl],"meu-time-itabaiana.png",{type:"image/png"});if(navigator.canShare({files:[f]})){sh.hidden=false;sh.addEventListener("click",function(){navigator.share({files:[f],title:"Meu time do Itabaiana",text:"Minha escala\u00e7\u00e3o do Tremend\u00e3o"}).catch(function(){})})}})}
 })}
function bindBuilder(){var b=document.getElementById("bld");if(!b)return;
 b.addEventListener("click",function(e){var t=e.target.closest("button");if(!t)return;
  if(t.dataset.f){mudarForm(t.dataset.f);refresh();return}
  if(t.dataset.slot!=null){var i=+t.dataset.slot;if(B.xi[i]!=null){B.xi[i]=null;B.sel=i}else B.sel=B.sel===i?-1:i;refresh();return}
  if(t.dataset.n){var n=+t.dataset.n,at=B.xi.indexOf(n);if(at>-1){B.xi[at]=null;refresh()}else colocar(n);return}
  var a=t.dataset.a;if(!a)return;
  if(a==="sug"){inicial();refresh()}
  if(a==="clr"){B.xi=B.xi.map(function(){return null});B.sel=-1;refresh()}
  if(a==="wa")window.open("https://wa.me/?text="+encodeURIComponent(texto()),"_blank","noopener");
  if(a==="x")window.open("https://twitter.com/intent/tweet?text="+encodeURIComponent(texto()),"_blank","noopener");
  if(a==="cp"){var tx=texto();(navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(tx):Promise.reject()).then(function(){say("Escalação copiada.")},function(){modal('<h3>Copie a escalação</h3><textarea class="cpa" readonly rows="14">'+esc(tx)+'</textarea>')})}
  if(a==="img")gerarImagem()});
 b.addEventListener("dragstart",function(e){var t=e.target.closest("[data-n],[data-slot]");if(!t)return;var n=t.dataset.n!=null?+t.dataset.n:B.xi[+t.dataset.slot];e.dataTransfer.setData("text/plain",String(n));e.dataTransfer.effectAllowed="move"});
 b.addEventListener("dragover",function(e){if(e.target.closest("[data-slot]"))e.preventDefault()});
 b.addEventListener("drop",function(e){var t=e.target.closest("[data-slot]");if(!t)return;e.preventDefault();var n=+e.dataTransfer.getData("text/plain");if(!isNaN(n)&&player(n))colocar(n,+t.dataset.slot)})}
/* ---------- elenco ---------- */
function squad(p){return '<article class="pc rv" data-g="'+p.g+'"><span class="nb">'+p.n+'</span><svg class="si" viewBox="0 0 100 120" fill="#fff" aria-hidden="true"><circle cx="50" cy="30" r="20"/><path d="M8 120c0-34 18-54 42-54s42 20 42 54z"/></svg><small>'+p.g.replace(/s$/,"")+'</small><h3>'+esc(p.nome)+'</h3></article>'}
function comissao(){var gs=[];D.comissao.forEach(function(c){if(gs.indexOf(c.grupo)<0)gs.push(c.grupo)});return gs.map(function(g){return '<div class="cm rv"><h3>'+g+'</h3><div class="cmr">'+D.comissao.filter(function(c){return c.grupo===g}).map(function(c){return '<div class="crw"><span>'+esc(c.cargo)+'</span><b>'+esc(c.nome)+'</b></div>'}).join("")+'</div></div>'}).join("")}
function elenco(full){var gs=["Todos","Goleiros","Defensores","Meio-campistas","Atacantes"];
return '<section class="sec"><div class="wrap">'+(full?'':'<div class="sh"><div><p class="eyebrow">Temporada '+D.temporada+'</p><h2>Elenco</h2></div></div>')+
'<div class="tabs" id="etabs" role="tablist"><button class="on" data-t="j">Jogadores</button><button data-t="c">Comissão técnica</button></div>'+
'<div id="pj"><div class="tabs" id="tabs">'+gs.map(function(g,i){return '<button class="'+(i?"":"on")+'" data-g="'+g+'">'+g+'</button>'}).join("")+'</div><div class="sq" id="sq">'+D.elenco.map(squad).join("")+'</div></div>'+
'<div id="pc" hidden><div class="cms">'+comissao()+'</div></div></div></section>'}
/* ---------- tabela por competição ---------- */
function compBody(c){if(c.tipo==="tabela"){var t=ordenada(c.tabela),r=t.filter(function(x){return me(x[0])})[0];
 return '<div class="two"><div style="overflow-x:auto"><table class="tb"><thead><tr><th>#</th><th>Time</th><th>P</th><th>J</th><th>V</th><th>E</th><th>D</th><th>SG</th></tr></thead><tbody>'+t.map(function(x,k){return '<tr class="'+(me(x[0])?"me":"")+'"><td>'+(k+1)+'</td><td>'+esc(x[0])+'</td><td>'+pts(x)+'</td><td>'+x[1]+'</td><td>'+x[2]+'</td><td>'+x[3]+'</td><td>'+x[4]+'</td><td>'+(x[5]-x[6])+'</td></tr>'}).join("")+'</tbody></table></div>'+(r?'<div><p class="eyebrow" style="margin-bottom:14px">Campanha do Itabaiana</p><div class="stats"><div><b>'+pts(r)+'</b><span>Pontos</span></div><div><b>'+r[2]+'</b><span>Vitórias</span></div><div><b>'+r[5]+'</b><span>Gols pró</span></div><div><b>'+r[6]+'</b><span>Gols contra</span></div></div></div>':'')+'</div>'}
 return '<div class="mata">'+c.confrontos.map(function(f){return '<div class="mt2"><span class="fs">'+esc(f.fase)+'</span><div class="vs"><b>'+esc(f.a)+'</b><i>×</i><b>'+esc(f.b)+'</b></div><div class="lg"><span>Ida <b>'+esc(f.ida)+'</b></span><span>Volta <b>'+esc(f.volta)+'</b></span></div><span class="st">'+esc(f.status)+'</span></div>'}).join("")+'</div>'}
function tab(full){return '<section class="sec w"><div class="wrap">'+(full?'':'<div class="sh"><div><p class="eyebrow">Temporada '+D.temporada+'</p><h2>Competições</h2></div></div>')+'<div class="tabs" id="ctabs">'+D.competicoes.map(function(c,i){return '<button class="'+(i?"":"on")+'" data-c="'+i+'">'+esc(c.nome)+'</button>'}).join("")+'</div><div id="cbody">'+compBody(D.competicoes[0])+'</div></div></section>'}
/* ---------- notícias, torcida, sócio ---------- */
function news(){return '<section class="sec"><div class="wrap"><div class="sh"><div><p class="eyebrow">Últimas</p><h2>Notícias</h2></div></div><div class="nw">'+D.noticias.slice(0,3).map(function(n){return '<a class="rv" href="#inicio"><img src="img/'+n.img+'.jpg" alt=""><div class="tx"><span class="tag">'+n.cat+'</span><h3>'+esc(n.t)+'</h3></div></a>'}).join("")+'</div></div></section>'}
function fanGrid(){var cl=["a","b","c","d","e","f"];return '<div class="fan">'+D.galeriaTorcida.slice(0,6).map(function(x,i){return '<div class="'+cl[i]+' rv"><img src="img/'+x+'.jpg" alt="Foto da torcida"></div>'}).join("")+'</div>'}
function fan(){return '<section class="sec w"><div class="wrap"><div class="sh"><div><p class="eyebrow">Arquibancada</p><h2>A torcida do Tremendão</h2></div><a class="btn o" href="#torcida">Ver galerias →</a></div>'+fanGrid()+'</div></section>'}
function torcida(){return pg("Torcida","Arquibancada","Fotos da torcida e galeria de cada jogo.")+
'<section class="sec w"><div class="wrap"><div class="sh"><div><p class="eyebrow">Geral</p><h2>Fotos da torcida</h2></div></div>'+fanGrid()+'<p class="hint" style="color:var(--mute);margin-top:12px">Imagens de exemplo. O clube alimenta esta galeria com fotos autorizadas.</p></div></section>'+
'<section class="sec"><div class="wrap"><div class="sh"><div><p class="eyebrow">Por partida</p><h2>Galerias dos jogos</h2></div></div><div class="alb">'+D.galeriasJogos.map(function(a,i){var d=new Date(a.data+"T12:00:00");return '<button class="ab rv" data-al="'+i+'"><img src="img/'+a.fotos[0]+'.jpg" alt=""><div class="tx"><span class="tag">'+esc(a.comp)+'</span><h3>'+esc(a.titulo)+'</h3><p>'+("0"+d.getDate()).slice(-2)+" "+MES[d.getMonth()]+" · "+a.fotos.length+' fotos</p></div></button>'}).join("")+'</div></div></section>'+
'<section class="sec w" style="padding:clamp(40px,5vw,70px) 0"><div class="wrap" style="display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap"><div><p class="eyebrow">Tem foto do jogo?</p><h2 style="font-size:clamp(2rem,4.4vw,3.6rem);margin-top:8px">Envie para o clube</h2></div><div class="rd">'+redesBtns("btn o","Olá! Quero enviar fotos do jogo.")+'</div></div></section>'}
function socioTeaser(){return '<section class="sb"><img class="bgs" src="'+LOGO+'" alt=""><div class="wrap"><p class="eyebrow" style="color:#fff;opacity:.9">Sócio-torcedor</p><h2>Seja parte<br>do time</h2><p>Planos a partir de R$ 30,00 por mês, com acesso aos jogos e benefícios exclusivos.</p><a class="btn" href="#socio">Quero ser sócio</a></div></section>'}
function brl(v){return "R$ "+v.toLocaleString("pt-BR",{minimumFractionDigits:2})}
function socio(){var S=D.socio,msg="Olá! Quero ser sócio-torcedor do Itabaiana.";
return '<section class="pg sc"><div class="wrap"><p class="eyebrow" style="color:#ff8a80">Programa oficial</p><h1>Sócio Tremendão</h1><p class="lead">Contribua com o clube todo mês, tenha acesso aos jogos e benefícios exclusivos. Planos e valores conforme o site oficial do programa.</p><div class="rd" style="margin-top:26px"><a class="btn" href="'+esc(S.site)+'" target="_blank" rel="noopener">Quero ser sócio</a>'+(C.whatsapp?'<a class="btn g" href="'+esc(href("whatsapp",C.whatsapp,msg))+'" target="_blank" rel="noopener">Tirar dúvidas no WhatsApp</a>':'')+'</div></div></section>'+
'<section class="sec w"><div class="wrap"><div class="sh"><div><p class="eyebrow">Escolha o seu</p><h2>Planos</h2></div><p class="lead">Valores de '+S.atualizado+', retirados de sociotremendao.com.br.</p></div><div class="plans">'+S.planos.map(function(p){return '<article class="plan rv'+(p.destaque?" feat":"")+'" style="--pc:'+p.cor+'"><h3>'+esc(p.nome)+'</h3><div class="pr"><span>a partir de</span><b>'+brl(p.mensal)+'</b><small>por mês</small></div><ul>'+p.itens.map(function(i){return '<li>'+esc(i)+'</li>'}).join("")+'</ul><div class="pays"><p><b>À vista (Pix, cartão ou boleto)</b> '+brl(p.vista)+' por ano, 10% de desconto</p>'+(p.anual?'<p><b>Parcelado</b> '+brl(p.anual)+' em até 12 x de '+brl(p.mensal)+'</p>':'')+'<p><b>Assinatura recorrente</b> '+brl(p.mensal)+' por mês</p></div>'+(p.nota?'<p class="pn">'+esc(p.nota)+'</p>':'')+'<a class="btn" href="'+esc(S.site)+'" target="_blank" rel="noopener">Quero este</a></article>'}).join("")+'</div><p class="hint" style="color:var(--mute);margin-top:18px">'+esc(S.taxaKit)+' Formas de pagamento: '+esc(S.pagamento)+'</p></div></section>'+
'<section class="sec"><div class="wrap"><div class="sh"><div><p class="eyebrow">Como funciona</p><h2>Em quatro passos</h2></div></div><div class="steps">'+S.passos.map(function(p,i){return '<div class="rv"><b>'+(i+1)+'</b><h3>'+esc(p[0])+'</h3><p>'+esc(p[1])+'</p></div>'}).join("")+'</div><div class="rd" style="margin-top:24px"><a class="btn o" href="'+esc(S.vantagens)+'" target="_blank" rel="noopener">Clube de vantagens</a><a class="btn o" href="'+esc(S.regulamento)+'" target="_blank" rel="noopener">Regulamento completo</a></div></div></section>'+
'<section class="sec w"><div class="wrap"><div class="sh"><div><p class="eyebrow">Canais oficiais</p><h2>Siga o clube</h2></div></div><div class="rd">'+redesBtns("btn o","")+'</div><div class="conf"><p>Operação: '+esc(S.operador)+'. Sede do clube: '+esc(S.sede)+'.</p></div></div></section>'}
function histTeaser(){return '<section class="sec dk" style="padding:clamp(48px,6vw,90px) 0"><div class="wrap" style="display:flex;justify-content:space-between;align-items:center;gap:24px;flex-wrap:wrap"><div><p class="eyebrow">Desde 1938</p><h2 style="font-size:clamp(2.4rem,6vw,5rem);margin-top:10px">11 títulos estaduais.<br>Campeão do Nordeste.</h2></div><a class="btn g" href="#historia">Conhecer a história →</a></div></section>'}
function pg(t,k,sub){return '<section class="pg"><div class="wrap"><p class="eyebrow" style="color:#ff8a80">'+k+'</p><h1>'+t+'</h1>'+(sub?'<p class="lead" style="margin-top:14px">'+sub+'</p>':'')+'</div></section>'}
/* ---------- jogos ---------- */
function cal(){var nx=proximo,cs=["Todas"];jogos.forEach(function(g){if(cs.indexOf(g.comp)<0)cs.push(g.comp)});
return pg("Jogos","Temporada "+D.temporada,"Calendário e resultados de todas as competições.")+'<section class="sec"><div class="wrap"><div class="tabs" id="jtabs">'+cs.map(function(c,i){return '<button class="'+(i?"":"on")+'" data-c="'+esc(c)+'">'+esc(c)+'</button>'}).join("")+'</div><div class="cal" id="cal">'+jogos.map(function(g){var c=result(g);return '<div class="cl rv'+(g===nx?" next":"")+'" data-c="'+esc(g.comp)+'"><div class="dt"><b>'+("0"+dt(g).getDate()).slice(-2)+'</b><span>'+MES[dt(g).getMonth()]+' · '+DIA[dt(g).getDay()]+'</span></div><div class="mt">'+crest(g.casa)+esc(g.casa)+' <span style="color:var(--mute)">×</span> '+esc(g.fora)+crest(g.fora)+'<span class="lc">'+esc(g.comp)+' · '+g.h+' · '+esc(g.local)+'</span></div>'+(played(g)?'<span class="rs '+c+'">'+g.gc+' – '+g.gf+'</span>':(g===nx?'<a class="btn bt" href="#jogos">Ingressos</a>':''))+'</div>'}).join("")+'</div></div></section>'}
/* ---------- história ---------- */
function historia(){
var eras=H.eras.map(function(e){var fs=H.hist.filter(function(f){return f.era===e.id});return '<section class="era"><div class="wrap"><h2><span>'+e.periodo+'</span>'+esc(e.nome)+'</h2><div class="fts">'+fs.map(function(f){return '<article class="ft rv'+(f.destaque?" hl":"")+'"><div class="yr'+(f.ano.length>4?" rg":"")+'">'+f.ano+'</div><div class="bd'+(f.img?"":" nf")+'"><div><h3>'+esc(f.titulo)+(f.validar?' <em class="vd">a confirmar</em>':'')+'</h3><p>'+esc(f.texto)+'</p></div>'+(f.img?'<figure class="ph"><img src="img/'+f.img+'.jpg" alt="Foto de acervo, '+f.ano+'" loading="lazy"></figure>':'')+'</div></article>'}).join("")+'</div></div></section>'}).join("");
return '<div class="hist"><section class="hh"><div class="wrap"><img class="cr" src="'+LOGO+'" alt="Escudo" width="358" height="499"><p class="eyebrow">Memória do clube</p><h1>Oitenta e oito anos de <i>Tremendão</i></h1><p>Fundado em 10 de julho de 1938, o clube guarda a história do futebol de Itabaiana. Tudo aqui vem do acervo público do Baú do Tremendão e de jornais da época.</p></div></section>'+
'<section class="era" style="border:0"><div class="wrap"><h2><span>Troféus</span>Conquistas</h2><div class="tt">'+H.titulos.map(function(t){return '<div><b>'+t.qtd+'</b><h3>'+esc(t.nome)+'</h3><p>'+esc(t.anos)+'</p></div>'}).join("")+'</div></div></section>'+eras+'</div>'}
var VIEWS={
 inicio:function(){return hero()+builder()+elenco()+tab()+news()+fan()+socioTeaser()+histTeaser()},
 jogos:cal,
 elenco:function(){return pg("Elenco","Temporada "+D.temporada)+elenco(true)},
 tabela:function(){return pg("Tabela","Temporada "+D.temporada,"Classificação e confrontos por competição.")+tab(true)},
 monte:function(){return pg("Monte o time","Interaja","Escolha a formação, monte a escalação e compartilhe.")+builder()},
 torcida:torcida,socio:socio,historia:historia
};
var cdT;
function cd(){var el=document.getElementById("cd");if(!el||!proximo)return;function f(){var s=Math.max(0,Math.floor((dt(proximo)-new Date())/1000)),d=Math.floor(s/86400),h=Math.floor(s%86400/3600),m=Math.floor(s%3600/60),x=s%60;el.innerHTML=[[d,"dias"],[h,"horas"],[m,"min"],[x,"seg"]].map(function(a){return '<div><strong>'+("0"+a[0]).slice(-2)+'</strong><span>'+a[1]+'</span></div>'}).join("")}f();clearInterval(cdT);cdT=setInterval(f,1000)}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{rootMargin:"0px 0px -6% 0px",threshold:.08});
function act(id,fn){var t=document.getElementById(id);if(t)t.addEventListener("click",function(e){var b=e.target.closest("button");if(!b)return;[].forEach.call(t.children,function(x){x.classList.toggle("on",x===b)});fn(b)})}
function bind(){
 [].forEach.call(document.querySelectorAll(".rv"),function(e){io.observe(e)});
 act("tabs",function(b){[].forEach.call(document.querySelectorAll("#sq .pc"),function(c){c.style.display=(b.dataset.g==="Todos"||c.dataset.g===b.dataset.g)?"":"none"})});
 act("etabs",function(b){document.getElementById("pj").hidden=b.dataset.t!=="j";document.getElementById("pc").hidden=b.dataset.t!=="c"});
 act("ctabs",function(b){document.getElementById("cbody").innerHTML=compBody(D.competicoes[+b.dataset.c])});
 act("jtabs",function(b){[].forEach.call(document.querySelectorAll("#cal .cl"),function(c){c.style.display=(b.dataset.c==="Todas"||c.dataset.c===b.dataset.c)?"":"none"})});
 [].forEach.call(document.querySelectorAll("[data-al]"),function(b){b.addEventListener("click",function(){var a=D.galeriasJogos[+b.dataset.al];modal('<h3>'+esc(a.titulo)+'</h3><div class="lb">'+a.fotos.map(function(f){return '<img src="img/'+f+'.jpg" alt="Foto do jogo '+esc(a.titulo)+'" loading="lazy">'}).join("")+'</div>')})});
 bindBuilder();cd()}
var atual=null;
function route(){[].forEach.call(document.querySelectorAll(".modal"),function(m){m.remove()});var v=(location.hash||"#inicio").slice(1);if(!VIEWS[v])v="inicio";atual=v;app.innerHTML=VIEWS[v]();
 [].forEach.call(document.querySelectorAll("#nav a"),function(a){a.classList.toggle("on",a.dataset.v===v)});
 document.getElementById("nav").classList.remove("open");document.getElementById("bg").setAttribute("aria-expanded","false");
 var dm=document.getElementById("demo");dm.hidden=!D.exemplo||v==="historia"||v==="socio";
 var fr=document.getElementById("fr");if(fr)fr.innerHTML=redesBtns("fl","");
 scrollTo(0,0);bind()}
document.getElementById("bg").addEventListener("click",function(){var n=document.getElementById("nav"),o=n.classList.toggle("open");this.setAttribute("aria-expanded",o)});
addEventListener("hashchange",function(){if((location.hash||"#inicio").slice(1)!==atual)route()});
/* navegação própria: não depende do hashchange (alguns visualizadores móveis não o disparam em iframe) */
document.addEventListener("click",function(e){var l=e.target.closest&&e.target.closest('a[href^="#"]');if(!l)return;var h=l.getAttribute("href"),v=h.slice(1);if(!VIEWS[v])return;e.preventDefault();try{if(location.hash!==h)location.hash=h}catch(x){}setTimeout(function(){if(atual!==v||location.hash!==h)route();else if(l.closest("main")&&atual===v&&!app.querySelector("h1,.hero"))route()},40);if(atual===v){route()}});
route();
if(window.Lenis&&!matchMedia("(prefers-reduced-motion:reduce)").matches&&!matchMedia("(pointer:coarse)").matches){var l=new Lenis({lerp:.1});(function r(t){l.raf(t);requestAnimationFrame(r)})(0)}
})();
