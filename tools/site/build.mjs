// Gera o site leitor do blueprint (public/index.html) a partir dos .md do repositório.
// Uso: cd tools/site && npm install && node build.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..');
const DOCS = path.join(ROOT, 'docs');
const OUT = path.join(ROOT, 'public', 'index.html');

marked.setOptions({ gfm: true, breaks: false });

function rewrite(html) {
  html = html.replace(/href="[^"]*README\.md"/g, 'href="#overview"');
  html = html.replace(/href="[^"]*?(\d\d)-[^"\/]*\.md"/g, 'href="#cap-$1"');
  html = html.replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, '</table></div>');
  return html;
}
const titleOf = (md, f) => { const m = md.match(/^#\s+(.+)$/m); return m ? m[1].trim() : f; };

const sections = [];
sections.push({ id: 'overview', nav: 'Visão Geral', html: rewrite(marked.parse(fs.readFileSync(path.join(ROOT, 'README.md'), 'utf8'))) });

for (const f of fs.readdirSync(DOCS).filter(f => /^\d\d-.*\.md$/.test(f)).sort()) {
  const num = f.slice(0, 2);
  const md = fs.readFileSync(path.join(DOCS, f), 'utf8');
  let nav = titleOf(md, f).replace(/^Cap[ií]tulo\s+\d+\s*[—-]\s*/i, '');
  if (num === '00') nav = 'Como usar';
  sections.push({ id: 'cap-' + num, nav: num + ' · ' + nav, html: rewrite(marked.parse(md)) });
}

const navHtml = sections.map(s => `<a class="nav-link" href="#${s.id}" data-id="${s.id}">${s.nav}</a>`).join('\n');
const sectionsHtml = sections.map(s => `<section class="chapter" id="${s.id}">${s.html}</section>`).join('\n');

const page = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Blueprint · Fazenda Lago São Francisco</title>
<meta name="description" content="Blueprint oficial de produto da plataforma digital de experiências da Fazenda Lago São Francisco.">
<meta name="robots" content="noindex">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
:root{--bg:#0d1311;--panel:#0a100e;--ink:#eef2ee;--muted:#9fb0a6;--line:rgba(200,220,205,.12);--gold:#c9a86a;--gold-soft:#d9c194;--serif:'Cormorant Garamond',Georgia,serif;--sans:'Inter',system-ui,sans-serif;}
*{box-sizing:border-box}html{scroll-behavior:smooth}
body{margin:0;background:var(--bg);color:var(--ink);font-family:var(--sans);font-size:16px;line-height:1.7;background-image:radial-gradient(1200px 600px at 80% -10%,rgba(63,111,87,.18),transparent 60%),radial-gradient(900px 500px at 0% 100%,rgba(201,168,106,.06),transparent 55%);background-attachment:fixed;}
a{color:var(--gold-soft);text-decoration:none}a:hover{color:var(--gold);text-decoration:underline;text-underline-offset:3px}
.layout{display:grid;grid-template-columns:310px 1fr;min-height:100vh}
.sidebar{position:sticky;top:0;align-self:start;height:100vh;overflow-y:auto;border-right:1px solid var(--line);background:linear-gradient(180deg,var(--panel),rgba(10,16,14,.8));padding:28px 20px 40px}
.brand{font-family:var(--serif);font-size:1.45rem;font-weight:600;letter-spacing:.3px;line-height:1.15;color:var(--ink)}
.brand small{display:block;font-family:var(--sans);font-size:.62rem;letter-spacing:.28em;text-transform:uppercase;color:var(--gold);margin-top:10px;font-weight:600}
.brand-rule{height:1px;background:linear-gradient(90deg,var(--gold),transparent);margin:18px 0 22px;opacity:.6}
.nav-link{display:block;padding:7px 10px;margin:1px 0;border-radius:7px;color:var(--muted);font-size:.82rem;letter-spacing:.2px;border:1px solid transparent;transition:.15s}
.nav-link:hover{color:var(--ink);background:rgba(255,255,255,.03);text-decoration:none}
.nav-link.active{color:var(--ink);background:rgba(201,168,106,.12);border-color:rgba(201,168,106,.25)}
.main{min-width:0;padding:0}.content{max-width:860px;margin:0 auto;padding:64px 40px 120px}
.chapter{display:none;animation:fade .5s ease}.chapter.active{display:block}
@keyframes fade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.content h1{font-family:var(--serif);font-weight:600;font-size:2.9rem;line-height:1.08;margin:.1em 0 .5em}
.content h2{font-family:var(--serif);font-weight:600;font-size:1.85rem;margin:2.2em 0 .6em;padding-bottom:.25em;border-bottom:1px solid var(--line)}
.content h3{font-weight:600;font-size:1.12rem;margin:1.8em 0 .5em;color:var(--gold-soft)}
.content h4{font-weight:600;color:var(--muted);margin:1.4em 0 .4em}
.content p{margin:.9em 0}
.content blockquote{margin:1.6em 0;padding:.8em 1.3em;border-left:3px solid var(--gold);background:rgba(201,168,106,.06);border-radius:0 8px 8px 0;color:#e7ecdf;font-family:var(--serif);font-size:1.18rem;font-style:italic;line-height:1.5}
.content blockquote p{margin:.3em 0}
.content ul,.content ol{margin:.8em 0;padding-left:1.3em}.content li{margin:.35em 0}
.content strong{color:#fff;font-weight:600}
.content hr{border:0;height:1px;background:var(--line);margin:2.6em 0}
.content code{font-family:ui-monospace,Menlo,monospace;font-size:.86em;background:rgba(255,255,255,.06);padding:.12em .4em;border-radius:5px;color:var(--gold-soft)}
.content pre{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:18px 20px;overflow-x:auto;margin:1.4em 0}
.content pre code{background:none;padding:0;color:#cfe0d4;font-size:.8rem;line-height:1.55}
.table-wrap{overflow-x:auto;margin:1.5em 0;border:1px solid var(--line);border-radius:12px}
.content table{border-collapse:collapse;width:100%;font-size:.86rem}
.content th,.content td{padding:10px 14px;text-align:left;border-bottom:1px solid var(--line);vertical-align:top}
.content thead th{background:rgba(201,168,106,.1);color:var(--gold-soft);font-weight:600;white-space:nowrap}
.content tbody tr:hover{background:rgba(255,255,255,.02)}.content tbody tr:last-child td{border-bottom:0}
.topbar{display:none}
@media(max-width:900px){
.layout{grid-template-columns:1fr}
.sidebar{position:fixed;z-index:40;width:82%;max-width:320px;transform:translateX(-100%);transition:.28s;box-shadow:0 0 60px rgba(0,0,0,.6)}
.sidebar.open{transform:none}
.topbar{display:flex;align-items:center;gap:14px;position:sticky;top:0;z-index:30;padding:12px 18px;background:rgba(13,19,17,.92);backdrop-filter:blur(10px);border-bottom:1px solid var(--line)}
.topbar .brand{font-size:1.05rem}
.burger{background:none;border:1px solid var(--line);color:var(--ink);border-radius:8px;padding:8px 11px;font-size:1rem;cursor:pointer}
.content{padding:32px 22px 100px}.content h1{font-size:2.1rem}.content h2{font-size:1.45rem}
.scrim{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:35;display:none}.scrim.show{display:block}
}
</style>
</head>
<body>
<div class="topbar"><button class="burger" id="burger" aria-label="Abrir menu">☰</button><div class="brand">Fazenda Lago São Francisco</div></div>
<div class="scrim" id="scrim"></div>
<div class="layout">
<aside class="sidebar" id="sidebar">
<div class="brand">Fazenda Lago<br>São Francisco<small>Blueprint de Produto</small></div>
<div class="brand-rule"></div>
<nav id="nav">
${navHtml}
</nav>
</aside>
<main class="main"><div class="content">
${sectionsHtml}
</div></main>
</div>
<script>
(function(){
var sections=[].slice.call(document.querySelectorAll('.chapter'));
var links=[].slice.call(document.querySelectorAll('.nav-link'));
var ids=sections.map(function(s){return s.id});
var sidebar=document.getElementById('sidebar');var scrim=document.getElementById('scrim');
function closeMenu(){sidebar.classList.remove('open');scrim.classList.remove('show');}
function show(id){if(ids.indexOf(id)===-1){id=ids[0];}
sections.forEach(function(s){s.classList.toggle('active',s.id===id);});
links.forEach(function(a){a.classList.toggle('active',a.getAttribute('data-id')===id);});
var active=document.querySelector('.nav-link.active');if(active){active.scrollIntoView({block:'nearest'});}
window.scrollTo({top:0,behavior:'auto'});closeMenu();}
function current(){return (location.hash||'').replace('#','');}
window.addEventListener('hashchange',function(){show(current());});
document.getElementById('burger').addEventListener('click',function(){sidebar.classList.toggle('open');scrim.classList.toggle('show');});
scrim.addEventListener('click',closeMenu);
show(current()||'overview');
})();
</script>
</body>
</html>`;

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, page);
console.log('Gerado', OUT, '—', sections.length, 'seções,', page.length, 'bytes');
