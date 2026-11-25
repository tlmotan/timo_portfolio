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
  slides.forEach(s => s.addEventListener('click', () => { if (s.dataset.pos === '-1') go(cur - 1); if (s.dataset.pos === '1') go(cur + 1); }));
  root.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') go(cur - 1); if (e.key === 'ArrowRight') go(cur + 1); });
  let x0 = null;
  root.addEventListener('pointerdown', e => { x0 = e.clientX; });
  root.addEventListener('pointerup', e => { if (x0 === null) return; const dx = e.clientX - x0; x0 = null; if (Math.abs(dx) > 40) go(cur + (dx < 0 ? 1 : -1)); });
  go(0);
})();
