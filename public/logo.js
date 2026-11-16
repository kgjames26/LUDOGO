/* Logo Ludogo — lettres dessinées à la main (tracés vectoriels, aucune police nécessaire).
   Chaque lettre = un tracé central épaissi (S) + une extrusion douce vers le bas à droite pour l'effet 3D léger. */
window.LUDOGO = (() => {
  const S = 15, H = 100;
  const glyphs = [
    { k: 'L', w: 52,  d: 'M0 0V100H52' },
    { k: 'U', w: 60,  d: 'M0 0V70A30 30 0 0 0 60 70V0' },
    { k: 'D', w: 76,  d: 'M0 0V100H26A50 50 0 0 0 26 0Z' },
    { k: 'O', w: 100, d: 'M50 0A50 50 0 1 0 50 100A50 50 0 1 0 50 0Z' },
    { k: 'G', w: 100, d: 'M93.3 25A50 50 0 1 0 100 50H54' },
    { k: 'O', w: 100, d: 'M50 0A50 50 0 1 0 50 100A50 50 0 1 0 50 0Z' },
  ];
  const DEPTH = 9, DX = 0.5, DY = 0.95;
  const pad = 14;
  const vb = (w) => `${-pad} ${-pad} ${w + pad * 2 + DEPTH * DX} ${H + pad * 2 + DEPTH * DY}`;
  const defs = `
    <linearGradient id="lg-face" gradientUnits="userSpaceOnUse" x1="0" y1="-8" x2="0" y2="108">
      <stop offset="0" stop-color="#fffaf0"/><stop offset=".36" stop-color="#f0dfb3"/>
      <stop offset=".5" stop-color="#cfae68"/><stop offset=".57" stop-color="#ead6a2"/>
      <stop offset=".82" stop-color="#bf9850"/><stop offset="1" stop-color="#8a6a2e"/>
    </linearGradient>
    <linearGradient id="lg-side" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="116">
      <stop offset="0" stop-color="#6e5428"/><stop offset="1" stop-color="#2a1f0c"/>
    </linearGradient>
    <filter id="lg-bevel" x="-10%" y="-10%" width="120%" height="125%" color-interpolation-filters="sRGB">
      <feGaussianBlur in="SourceAlpha" stdDeviation="1.6" result="b"/>
      <feSpecularLighting in="b" surfaceScale="3.2" specularConstant=".75" specularExponent="24" lighting-color="#fffbe9" result="s">
        <feDistantLight azimuth="235" elevation="52"/>
      </feSpecularLighting>
      <feComposite in="s" in2="SourceAlpha" operator="in" result="sc"/>
      <feComposite in="SourceGraphic" in2="sc" operator="arithmetic" k1="0" k2="1" k3=".55" k4="0"/>
    </filter>
    <filter id="lg-shadow" x="-20%" y="-20%" width="140%" height="160%">
      <feGaussianBlur stdDeviation="5"/>
    </filter>`;
  const letter = (g, withShadow = true) => {
    let out = '';
    if (withShadow) out += `<path d="${g.d}" transform="translate(5 ${DEPTH + 7})" fill="none" stroke="#000" stroke-opacity=".55" stroke-width="${S}" stroke-linejoin="miter" filter="url(#lg-shadow)"/>`;
    for (let i = DEPTH; i >= 1; i--) {
      out += `<path d="${g.d}" transform="translate(${(i * DX).toFixed(2)} ${(i * DY).toFixed(2)})" fill="none" stroke="url(#lg-side)" stroke-width="${S}" stroke-linejoin="miter"/>`;
    }
    out += `<path d="${g.d}" fill="none" stroke="url(#lg-face)" stroke-width="${S}" stroke-linejoin="miter" filter="url(#lg-bevel)"/>`;
    return out;
  };
  const letterSVG = (g) => `<svg class="ltr-svg" viewBox="${vb(g.w)}" aria-hidden="true" style="aspect-ratio:${(g.w + pad * 2 + DEPTH * DX).toFixed(1)}/${(H + pad * 2 + DEPTH * DY).toFixed(1)}">${letter(g)}</svg>`;
  const layout = () => {
    const gap = 30; let x = 0; const items = [];
    glyphs.forEach((g) => { items.push({ g, x }); x += g.w + gap - (g.k === 'O' || g.k === 'G' ? 6 : 0) - (g.k === 'L' ? 9 : 0); });
    const w = x - gap + 6;
    const vbW = w + pad * 2 + DEPTH * DX, vbH = H + pad * 2 + DEPTH * DY;
    return { items, w, vbW, vbH };
  };
  const full = () => {
    const { items, w } = layout(); let body = '';
    items.forEach(({ g, x }) => { body += `<g transform="translate(${x} 0)">${letter(g)}</g>`; });
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb(w)}" role="img" aria-label="Ludogo"><defs>${defs}</defs>${body}</svg>`;
  };
  return { glyphs, defs, letterSVG, layout, full, S, H, pad };
})();
if (typeof module !== 'undefined') module.exports = window.LUDOGO;
