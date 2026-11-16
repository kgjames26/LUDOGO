(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const standalone = matchMedia('(display-mode: fullscreen)').matches || matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  const root = document.documentElement;
  const canFs = !!(root.requestFullscreen || root.webkitRequestFullscreen);

  /* ───── Logo animé de l'ouverture ───── */
  const L = window.LUDOGO;
  const lay = L.layout();
  const logoBox = $('#inLogo');
  logoBox.style.aspectRatio = `${lay.vbW.toFixed(2)} / ${lay.vbH.toFixed(2)}`;
  const letters = (cls) => lay.items.map(({ g, x }, i) => {
    const left = ((x - L.pad) / lay.vbW) * 100, width = ((g.w + L.pad * 2 + 4.5) / lay.vbW) * 100;
    return `<span class="${cls}" style="--i:${i};left:${left.toFixed(3)}%;width:${width.toFixed(3)}%">${L.letterSVG(g)}</span>`;
  }).join('');
  logoBox.innerHTML =
    `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>${L.defs}</defs></svg>` +
    letters('ltr') + `<div class="glint">${letters('ltr')}</div>`;

  // poussière de lumière
  const dust = $('#dust');
  for (let i = 0; i < 26; i++) {
    const d = document.createElement('i');
    d.style.left = (8 + Math.random() * 84) + '%'; d.style.top = (30 + Math.random() * 50) + '%';
    d.style.animationDelay = (0.6 + Math.random() * 3.2).toFixed(2) + 's';
    d.style.animationDuration = (3 + Math.random() * 3).toFixed(2) + 's';
    d.style.width = d.style.height = (2 + Math.random() * 3).toFixed(1) + 'px';
    dust.appendChild(d);
  }

  /* ───── Plein écran ───── */
  const inFs = () => !!(document.fullscreenElement || document.webkitFullscreenElement);
  async function goFs() {
    if (standalone || inFs() || !canFs) return;
    try { await (root.requestFullscreen || root.webkitRequestFullscreen).call(root, { navigationUI: 'hide' }); } catch (e) { /* refusé sans geste */ }
  }
  async function leaveFs() { try { await (document.exitFullscreen || document.webkitExitFullscreen).call(document); } catch (e) {} }
  // tentative immédiate au chargement (acceptée seulement si le navigateur l'autorise), sinon au premier geste
  goFs();
  const firstGesture = () => { goFs(); };
  ['pointerdown', 'keydown'].forEach((ev) => addEventListener(ev, firstGesture, { once: true, passive: true }));
  const btnFs = $('#btnFs');
  if (!canFs || standalone) btnFs.hidden = true;
  btnFs.addEventListener('click', (e) => { e.stopPropagation(); inFs() ? leaveFs() : goFs(); });
  if (!canFs || standalone) $('#inHint').hidden = true;

  /* ───── Ouverture : jeu de la séquence, fin, saut ───── */
  const intro = $('#intro');
  let finished = false;
  function endIntro() {
    if (finished) return; finished = true;
    intro.classList.add('out');
    document.body.classList.remove('intro-on');
    setTimeout(() => { intro.remove(); }, 1400);
    startReveal();
  }
  if (reduce) { setTimeout(endIntro, 500); }
  else {
    requestAnimationFrame(() => requestAnimationFrame(() => document.body.classList.add('intro-play')));
    setTimeout(endIntro, 4900);
  }
  intro.addEventListener('click', () => { goFs(); endIntro(); });

  /* ───── Catalogue ───── */
  const arrow = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const cardHTML = (it, label, idx) => {
    const imgs = it.shots.map((s, i) => `<img src="/shots/${s}.webp" alt="${esc(it.name)} — capture ${i + 1}" width="1280" height="720" decoding="async" ${idx < 2 && i === 0 ? '' : 'loading="lazy"'} class="${i === 0 ? 'on' : ''}">`).join('');
    const thumbs = it.shots.length > 1 ? `<div class="thumbs" role="group" aria-label="Captures de ${esc(it.name)}">${it.shots.map((s, i) =>
      `<button type="button" data-i="${i}" aria-label="Voir la capture ${i + 1} de ${esc(it.name)}" aria-current="${i === 0}"><img src="/shots/${s}.webp" alt="" loading="lazy" decoding="async" width="124" height="70"></button>`).join('')}</div>` : '';
    return `<article class="card" data-id="${it.id}" style="transition-delay:0s">
      <div class="gal"><div class="main">${imgs}</div>${thumbs}${it.version ? `<span class="ver">${esc(it.version)}</span>` : ''}</div>
      <div class="body">
        <span class="kind">${esc(it.kind)}</span>
        <h3>${esc(it.name)}</h3>
        <p class="desc">${esc(it.desc)}</p>
        <div class="chips">${it.chips.map((c) => `<span>${esc(c)}</span>`).join('')}</div>
        <a class="cta" href="${it.url}" target="_blank" rel="noopener">${label} ${arrow}</a>
      </div></article>`;
  };
  const C = window.CATALOG;
  $('#gridGames').innerHTML = C.games.map((g, i) => cardHTML(g, 'Jouer', i)).join('');
  $('#gridApps').innerHTML = C.apps.map((a, i) => cardHTML(a, 'Ouvrir', i)).join('');
  [['#gridGames', C.games.length], ['#gridApps', C.apps.length]].forEach(([s, n]) => { const g = $(s); g.dataset.rem = n % 3; g.dataset.odd = n % 2; });
  $('#nGames').textContent = C.games.length; $('#nApps').textContent = C.apps.length;
  $('#lead').textContent = `Ludogo réunit ses ${C.games.length} jeux et ses ${C.apps.length} applications au même endroit : touche une carte pour jouer ou ouvrir, tout s'installe comme une vraie application.`;

  /* galeries : vignettes + défilement doux */
  document.querySelectorAll('.card').forEach((card) => {
    const imgs = [...card.querySelectorAll('.main img')];
    const btns = [...card.querySelectorAll('.thumbs button')];
    if (imgs.length < 2) return;
    let cur = 0, timer = null, paused = false, visible = false;
    const show = (n) => { cur = (n + imgs.length) % imgs.length; imgs.forEach((im, i) => im.classList.toggle('on', i === cur)); btns.forEach((b, i) => b.setAttribute('aria-current', i === cur)); };
    btns.forEach((b) => b.addEventListener('click', () => { paused = true; show(+b.dataset.i); }));
    const tick = () => { if (!paused && visible && !document.hidden && !reduce) show(cur + 1); };
    timer = setInterval(tick, 4800 + Math.random() * 800);
    new IntersectionObserver((es) => es.forEach((e) => { visible = e.isIntersecting; }), { threshold: .4 }).observe(card);
    card.addEventListener('pointerenter', () => { paused = true; });
  });

  /* apparition au défilement */
  let revealStarted = false;
  function startReveal() {
    if (revealStarted) return; revealStarted = true;
    const items = [...document.querySelectorAll('.reveal, .card')];
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target; const sibs = [...el.parentElement.children]; const k = Math.max(0, sibs.indexOf(el)) % 3;
      el.style.transitionDelay = (k * 0.09) + 's';
      el.classList.add('in'); io.unobserve(el);
    }), { threshold: .12, rootMargin: '0px 0px -6% 0px' });
    items.forEach((el, i) => { if (el.classList.contains('reveal') && el.closest('.hero')) el.style.transitionDelay = (0.15 + i * 0.12) + 's'; io.observe(el); });
  }

  /* installation */
  let deferred = null; const btnInstall = $('#btnInstall');
  addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferred = e; if (!standalone) btnInstall.hidden = false; });
  btnInstall.addEventListener('click', async () => { if (!deferred) return; deferred.prompt(); try { await deferred.userChoice; } catch (e) {} deferred = null; btnInstall.hidden = true; });
  addEventListener('appinstalled', () => { btnInstall.hidden = true; });

  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}));
  }
})();
