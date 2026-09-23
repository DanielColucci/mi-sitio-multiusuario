// Datos centralizados (seed compatible con el reto). El estado se guarda en localStorage
// para que las acciones de AT y HM se reflejen entre las tres vistas.
const FASES = ['Postulación', 'Evaluación IA', 'Búsqueda y Atracción', 'Evaluación con HM', 'Carta oferta'];
const SEED = [
  { id: 1, n: 'Ana López', p: 'Gerente de Proyectos E-commerce', e: 'Retail Digital S.A.', c: 92, f: 3, st: 'at',
    note: 'Excelente visión de negocio y enfoque en optimización de conversión.' },
  { id: 2, n: 'Carlos Mendoza', p: 'Desarrollador Backend Senior', e: 'Soluciones Tech S. de R.L.', c: 88, f: 3, st: 'at',
    note: 'Dominio excepcional de microservicios y Spring Boot. Sólido fit técnico.' },
  { id: 3, n: 'Sofia Herrera', p: 'Analista de Datos Jr.', e: 'Consultoría Analítica Co.', c: 95, f: 4, st: 'hm',
    note: 'Conocimientos sólidos en SQL y Tableau. Demostró gran capacidad analítica.' }
];
const PAGES = [
  ['index.html', 'Candidato', 'fa-user'],
  ['at.html', 'Atracción (AT)', 'fa-magnifying-glass'],
  ['hm.html', 'Hiring Manager', 'fa-user-check']
];

const $ = s => document.querySelector(s);
const clone = o => JSON.parse(JSON.stringify(o));
const ini = n => n.split(' ').map(x => x[0]).join('');
let S;
try { S = JSON.parse(localStorage.getItem('lh26')) || clone(SEED); } catch { S = clone(SEED); }
const save = () => { try { localStorage.setItem('lh26', JSON.stringify(S)); } catch {} };
const page = document.body.dataset.page;

/* ---------- Acciones ---------- */
function toast(msg, type = 'ok') {
  const t = document.createElement('div');
  t.className = 'toast ' + type;
  t.innerHTML = `<i class="fas ${type === 'ok' ? 'fa-circle-check' : 'fa-circle-xmark'}"></i>${msg}`;
  $('#toasts').append(t);
  setTimeout(() => t.remove(), 4000);
}
function enviarAHm(id) {
  const c = S.find(x => x.id === id);
  c.st = 'hm'; c.f = 4; save(); render();
  toast(`<b>${c.n}</b> fue enviado/a al Hiring Manager para su evaluación técnica.`);
}
function veredictoHm(id, d) {
  const c = S.find(x => x.id === id);
  if (d === 'finalista') {
    c.st = 'finalista'; c.f = 5; toast(`<b>${c.n}</b> es finalista. Se solicitará la carta oferta.`);
  } else {
    c.st = 'descartado'; toast(`<b>${c.n}</b> fue descartado/a del proceso.`, 'no');
  }
  save(); render();
}
function reiniciar() { S = clone(SEED); save(); render(); toast('Demo reiniciada con los datos originales.'); }

/* ---------- Piezas de UI ---------- */
const stat = (icon, label, val, sub, tone = '') =>
  `<div class="card stat"><div class="ico"><i class="fas ${icon}"></i></div><small>${label}</small>
   <div class="v ${tone}">${val}</div><small>${sub}</small></div>`;
const bar = c => `<div class="cbar"><i><span style="width:${c}%"></span></i><b>${c}%</b></div>`;
const tag = (t, cls) => `<span class="tag ${cls}">${t}</span>`;
const head = (title, sub) =>
  `<div class="page-head"><span class="pill"><i class="fas fa-wand-magic-sparkles"></i> LiverHack 2026 · Reclutamiento integral</span>
   <h1>${title}</h1><p>${sub}</p></div>`;

function shell() {
  const cur = PAGES.find(p => p[0] === page + '.html');
  $('#nav').innerHTML = `<div class="nav"><div class="nav-in">
    <a class="logo" href="index.html">Liver<b>Talent</b></a>
    <nav class="tabs" aria-label="Vistas de la demo">${PAGES.map(p =>
      `<a href="${p[0]}" class="${p === cur ? 'on' : ''}">${p[1]}</a>`).join('')}</nav>
    <div class="nav-r"><span class="role"><i class="fas ${cur[2]}"></i>Rol: ${cur[1]}</span>
    <button class="btn cta btn-sm" onclick="reiniciar()">Reiniciar demo</button></div></div></div>`;
}

/* ---------- Vistas ---------- */
function viewCandidato() {
  const a = S[0];
  const info = {
    at: ['En proceso', 'Validación de requisitos', 'Atracción de Talento (AT)', 'Esperando entrevista final'],
    hm: ['En evaluación', 'Revisión técnica', 'Hiring Manager (HM)', 'Tu perfil está con el líder de la vacante'],
    finalista: ['Finalista', 'Solicitud de carta oferta', 'Hiring Manager (HM)', '¡Avanzaste a la última etapa!'],
    descartado: ['Proceso concluido', 'Sin siguientes pasos', 'Atracción de Talento (AT)', 'Gracias por participar']
  }[a.st];
  return head('Portal del candidato', 'Sigue en tiempo real el avance de tu postulación en Liverpool.') + `
  <section class="feature"><div class="feature-in"><span class="bignum">0${a.f}</span>
    <div class="items">
      <div class="item"><div class="ico"><i class="fas fa-flag"></i></div><div><small>Estatus de la vacante</small><strong>${info[0]} · Fase ${a.f}</strong></div></div>
      <div class="item"><div class="ico"><i class="fas fa-user-tie"></i></div><div><small>Responsable actual</small><strong>${info[2]}</strong></div></div>
      <div class="item"><div class="ico"><i class="fas fa-list-check"></i></div><div><small>Siguiente paso</small><strong>${info[1]}</strong></div></div>
    </div>
    <div class="hl">
      <div class="numrow"><div class="numbox">0${a.f}</div><hr></div>
      <span class="eyebrow">Tu proceso de selección</span>
      <h2>${FASES[a.f - 1]}</h2>${tag(info[3], a.st === 'descartado' ? 'bad' : a.st === 'finalista' ? 'ok' : 'warn')}
      <div class="line"></div>
    </div></div></section>

  <div class="card mt"><h3>Avance del proceso</h3>
    <div class="steps">${FASES.map((f, i) =>
      `<div class="step ${i + 1 < a.f ? 'done' : i + 1 === a.f ? 'now' : ''}"><div class="dot">${i + 1 < a.f ? '<i class="fas fa-check"></i>' : i + 1}</div>${f}</div>`).join('')}</div></div>

  <div class="grid g2 mt">
    <div class="card"><h3>Expediente del postulante</h3>
      <div class="data">
        <div><small>Nombre</small><span>${a.n}</span></div><div><small>Escolaridad</small><span>Licenciatura en Marketing Digital</span></div>
        <div><small>Puesto actual</small><span>${a.p}</span></div><div><small>Pretensión salarial</small><span>$1,200,000 MXN</span></div>
        <div><small>Empresa</small><span>${a.e}</span></div><div><small>Idiomas</small><span>Inglés (C1)</span></div>
      </div></div>
    <div class="card" style="text-align:center"><small class="eyebrow">Compatibilidad IA · AssessFirst</small>
      <div class="ring" style="--p:${a.c}"><span>${a.c}%</span></div><small>Perfil altamente competitivo</small></div>
  </div>`;
}

function viewAT() {
  const pend = S.filter(c => c.st === 'at').length;
  const rows = S.map(c => `<tr>
    <td><div class="who"><div class="av">${ini(c.n)}</div><div><b>${c.n}</b><small>${c.e}</small></div></div></td>
    <td>${c.p}</td><td>${bar(c.c)}</td>
    <td>${tag('Fase ' + c.f + ': ' + FASES[c.f - 1], 'info')}</td>
    <td>${c.st === 'at' ? `<button class="btn btn-go btn-sm" onclick="enviarAHm(${c.id})"><i class="fas fa-paper-plane"></i> Enviar a HM</button>`
      : c.st === 'hm' ? tag('Enviado a HM', 'warn') : c.st === 'finalista' ? tag('Finalista', 'ok') : tag('Descartado', 'bad')}</td></tr>`).join('');
  return head('Panel de Atracción de Talento', 'Revisa el avance de los perfiles y transfiere a los aprobados al Hiring Manager.') + `
  <div class="grid g3">
    ${stat('fa-users', 'Pool de candidatos', '10 calificados', 'Sincronizado con AssessFirst')}
    ${stat('fa-gauge-high', 'SLA del proceso', 'En tiempo', 'Fase 3 activa', 'ok')}
    ${stat('fa-bell', 'Acciones pendientes', pend + (pend === 1 ? ' envío a HM' : ' envíos a HM'), 'Requiere validación', pend ? 'bad' : 'ok')}
  </div>
  <div class="card mt"><h3>Gestión de candidatos</h3>
    <div class="scroll"><table class="tbl"><thead><tr><th>Candidato</th><th>Puesto actual</th><th>Compatibilidad IA</th><th>Fase</th><th>Acción</th></tr></thead>
    <tbody>${rows}</tbody></table></div></div>`;
}

function viewHM() {
  const list = S.filter(c => c.st !== 'at');
  const pend = S.filter(c => c.st === 'hm').length;
  const cards = list.map(c => `<div class="cand"><div>
      <div class="who"><div class="av">${ini(c.n)}</div><div><h3 style="font-size:1.25rem">${c.n}</h3><small>${c.p}</small></div></div>
      <div style="margin-top:10px">${tag(c.c + '% compatibilidad IA', 'ok')}</div>
      <div class="note"><i class="fas fa-comment-dots"></i><b>Notas de AT:</b> ${c.note}</div></div>
    <div class="acts">${c.st === 'hm'
      ? `<button class="btn btn-ok btn-sm" onclick="veredictoHm(${c.id},'finalista')"><i class="fas fa-check"></i> Marcar finalista</button>
         <button class="btn btn-no btn-sm" onclick="veredictoHm(${c.id},'descartar')"><i class="fas fa-xmark"></i> Descartar</button>`
      : c.st === 'finalista' ? tag('Finalista · oferta en trámite', 'ok') : tag('Descartado', 'bad')}</div></div>`).join('');
  return head('Panel del Hiring Manager', 'Revisa la información enviada por Atracción de Talento y emite tu veredicto técnico.') + `
  <div class="grid g3">
    ${stat('fa-laptop-code', 'Vacante específica', 'Líder Técnico E-Commerce', 'Área de Sistemas / Tecnología')}
    ${stat('fa-inbox', 'Respuestas de AT', list.length + (list.length === 1 ? ' candidato' : ' candidatos'), pend + ' listos para revisión técnica', 'ok')}
    ${stat('fa-clock', 'Estado de SLA', 'Acción requerida', 'Queda 1 día de plazo', 'bad')}
  </div>
  <div class="card mt"><h3>Evaluación y decisión de candidatos</h3><div style="margin-top:16px">
    ${cards || '<div class="empty"><i class="fas fa-inbox fa-2x"></i><p>Aún no hay candidatos. Envía uno desde la vista de Atracción.</p></div>'}
  </div></div>`;
}

function render() {
  shell();
  $('#app').innerHTML = { index: viewCandidato, at: viewAT, hm: viewHM }[page]();
}
render();
