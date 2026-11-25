(() => {
  const root = document.getElementById('carousel'), slides = [...root.querySelectorAll('.slide')], dots = document.getElementById('dots');
  const n = slides.length; let cur = 0;
  slides.forEach((_, i) => { const b = document.createElement('button'); b.id = 'dot-' + i; b.setAttribute('aria-label', 'Show project ' + (i+1)); b.onclick = () => go(i); dots.appendChild(b); });
  function go(i){
    cur = (i + n) % n;
    slides.forEach((s, j) => {
      let d = j - cur; if (d > n/2) d -= n; if (d < -n/2) d += n;   // wrap around
      s.dataset.pos = Math.abs(d) <= 1 ? String(d) : 'far';
      s.setAttribute('aria-hidden', d !== 0);
      s.querySelectorAll('a').forEach(a => a.tabIndex = d === 0 ? 0 : -1);
    });
    [...dots.children].forEach((b, j) => b.setAttribute('aria-current', j === cur));
  }
  document.getElementById('prev').onclick = () => go(cur - 1);
  document.getElementById('next').onclick = () => go(cur + 1);
  let swiped = false;
  const dlg = document.getElementById('cs');
  function openCase(s){
    const q = sel => s.querySelector(sel);
    document.getElementById('cs-shot').innerHTML = q('.shot').innerHTML;
    document.getElementById('cs-title').textContent = q('h3').textContent;
    document.getElementById('cs-one').innerHTML = q('.one').innerHTML;
    document.getElementById('cs-stack').innerHTML = q('.stack').innerHTML;
    const body = document.getElementById('cs-body'); body.replaceChildren(q('template.detail').content.cloneNode(true));
    dlg.showModal();
  }
  document.getElementById('cs-close').onclick = () => dlg.close();
  dlg.addEventListener('close', () => document.getElementById('cs-body').replaceChildren());   // stops any playing video
  dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
  slides.forEach(s => s.addEventListener('click', () => { if (swiped) { swiped = false; return; } if (s.dataset.pos === '-1') go(cur - 1); else if (s.dataset.pos === '1') go(cur + 1); else if (s.dataset.pos === '0') openCase(s); }));
  root.addEventListener('keydown', e => { if (e.key === 'Enter') { const a = slides.find(s => s.dataset.pos === '0'); if (a) openCase(a); } });
  root.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') go(cur - 1); if (e.key === 'ArrowRight') go(cur + 1); });
  let x0 = null;
  root.addEventListener('pointerdown', e => { x0 = e.clientX; });
  root.addEventListener('pointerup', e => { if (x0 === null) return; const dx = e.clientX - x0; x0 = null; if (Math.abs(dx) > 40) { swiped = true; setTimeout(() => swiped = false, 50); go(cur + (dx < 0 ? 1 : -1)); } });
  go(0);
})();
(() => {
  const btns = [...document.querySelectorAll('.filters button')], items = [...document.querySelectorAll('#log li')];
  btns.forEach(b => b.addEventListener('click', () => {
    btns.forEach(x => x.setAttribute('aria-pressed', x === b));
    items.forEach(li => { li.hidden = b.dataset.k !== 'all' && li.dataset.k !== b.dataset.k; });
  }));
})();
(() => {
  const btn = document.getElementById('lede-toggle'), more = document.getElementById('lede-more');
  btn.addEventListener('click', () => {
    more.hidden = !more.hidden;
    btn.setAttribute('aria-expanded', !more.hidden);
    document.getElementById('lede-label').textContent = more.hidden ? 'Show more' : 'Show less';
  });
})();
 (() => {
  document.querySelectorAll('.xp > li').forEach(li => {
    const btn = li.querySelector('.xp-toggle');
    li.addEventListener('click', e => {
      if (e.target.closest('a')) return;
      btn.setAttribute('aria-expanded', li.classList.toggle('open'));
    });
  });
})();
