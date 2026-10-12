/* Exercise figures: the images teachers post with an exercise, drawn as SVG.
   One source for both prototypes: prototype/src/build.js inlines this file into the student app,
   and web/dashboard.html loads it, so the teacher and the student see the same drawing. */
const figEsc = s => String(s).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
const FIG_INK = '#1F1A2B', FIG_MUTE = '#5B536B', FIG_GRID = '#ECE6F3';
const figTxt = (x, y, t, o = {}) => `<text x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" font-size="${o.fs || 10.5}" fill="${o.c || FIG_MUTE}">${figEsc(t)}</text>`;
const figLine = (x1, y1, x2, y2, c = FIG_INK, w = 1.5, extra = '') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${w}" stroke-linecap="round" ${extra}/>`;
const figArrowR = (x, y) => `<path d="M${x - 6} ${y - 4} L${x} ${y} L${x - 6} ${y + 4}" fill="none" stroke="${FIG_INK}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`;
const figArrowU = (x, y) => `<path d="M${x - 4} ${y + 6} L${x} ${y} L${x + 4} ${y + 6}" fill="none" stroke="${FIG_INK}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`;
const FIGURES = {
  affine() {
    const u = 30, ml = 20, mt = 14;
    const X = v => ml + (v + 2) * u, Y = v => mt + (4 - v) * u;
    let s = '';
    for (let v = -2; v <= 4; v++) s += figLine(X(v), Y(-2), X(v), Y(4), FIG_GRID, 1) + figLine(X(-2), Y(v), X(4), Y(v), FIG_GRID, 1);
    s += figLine(X(-2), Y(0), X(4) + 10, Y(0)) + figArrowR(X(4) + 10, Y(0)) + figLine(X(0), Y(-2), X(0), Y(4) - 8) + figArrowU(X(0), Y(4) - 8);
    [-2, -1, 1, 2, 3].forEach(v => { s += figTxt(X(v), Y(0) + 15, String(v).replace('-', '−')) + (v > -2 ? figTxt(X(0) - 7, Y(v) + 4, String(v).replace('-', '−'), { a: 'end' }) : ''); });
    s += figTxt(X(0) - 7, Y(0) + 15, 'O', { a: 'end' });
    s += figLine(X(2), Y(3), X(2), Y(0), '#9333EA', 1.3, 'stroke-dasharray="3 4" opacity="0.6"') + figLine(X(2), Y(3), X(0), Y(3), '#9333EA', 1.3, 'stroke-dasharray="3 4" opacity="0.6"');
    s += figLine(X(-0.5), Y(-2), X(2.5), Y(4), '#9333EA', 2.6);
    s += `<circle cx="${X(0)}" cy="${Y(-1)}" r="4" fill="#fff" stroke="#9333EA" stroke-width="2.4"/><circle cx="${X(2)}" cy="${Y(3)}" r="4" fill="#fff" stroke="#9333EA" stroke-width="2.4"/>`;
    s += figTxt(X(2.5) + 6, Y(3.6), '(d)', { a: 'start', fs: 12.5, c: '#6B21A8' });
    return { w: X(4) + 22, h: Y(-2) + 10, s };
  },
  ohm() {
    const ml = 40, mt = 28, px = 37.5, py = 25;
    const X = i => ml + i * 100 * px, Y = v => mt + (6 - v) * py;
    let s = '';
    for (let k = 0; k <= 6; k++) s += figLine(X(k / 100), Y(0), X(k / 100), Y(6), FIG_GRID, 1) + figLine(X(0), Y(k), X(0.06), Y(k), FIG_GRID, 1);
    s += figLine(X(0), Y(0), X(0.06) + 12, Y(0)) + figArrowR(X(0.06) + 12, Y(0)) + figLine(X(0), Y(0), X(0), Y(6) - 10) + figArrowU(X(0), Y(6) - 10);
    for (let k = 1; k <= 6; k++) s += figTxt(X(k / 100), Y(0) + 15, `0,0${k}`, { fs: 9.5 }) + figTxt(X(0) - 7, Y(k) + 4, String(k), { a: 'end' });
    s += figTxt(X(0) - 7, Y(0) + 15, '0', { a: 'end' }) + figTxt(X(0.06) + 16, Y(0) + 4, 'I (A)', { a: 'start', c: FIG_INK }) + figTxt(X(0) + 8, Y(6) - 10, 'U (V)', { a: 'start', c: FIG_INK });
    s += figLine(X(0), Y(0), X(0.06), Y(6), '#088D84', 2.4);
    [[0.01, 1], [0.02, 2], [0.03, 3], [0.05, 5]].forEach(([i, v]) => { const x = X(i), y = Y(v); s += `<path d="M${x - 4} ${y - 4}l8 8M${x + 4} ${y - 4}l-8 8" stroke="${FIG_INK}" stroke-width="1.8" stroke-linecap="round"/>`; });
    return { w: X(0.06) + 52, h: Y(0) + 24, s };
  },
  thales() {
    const A = [135, 22], B = [28, 176], C = [242, 176], k = 0.4;
    const M = [A[0] + (B[0] - A[0]) * k, A[1] + (B[1] - A[1]) * k], N = [A[0] + (C[0] - A[0]) * k, A[1] + (C[1] - A[1]) * k];
    const chev = (x, y, c) => `<path d="M${x - 7} ${y - 4.5}l4.5 4.5-4.5 4.5M${x - 1} ${y - 4.5}l4.5 4.5-4.5 4.5" fill="none" stroke="${c}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`;
    let s = `<path d="M${A} L${B} L${C} Z" fill="#F6F0FD" stroke="${FIG_INK}" stroke-width="2" stroke-linejoin="round"/>`;
    s += figLine(M[0], M[1], N[0], N[1], '#9333EA', 2.6) + chev((M[0] + N[0]) / 2, M[1], '#9333EA') + chev((B[0] + C[0]) / 2, B[1], FIG_INK);
    [A, B, C, M, N].forEach(p => { s += `<circle cx="${p[0]}" cy="${p[1]}" r="2.8" fill="${FIG_INK}"/>`; });
    s += figTxt(A[0], A[1] - 9, 'A', { c: FIG_INK, fs: 12.5 }) + figTxt(B[0] - 8, B[1] + 16, 'B', { c: FIG_INK, fs: 12.5 }) + figTxt(C[0] + 8, C[1] + 16, 'C', { c: FIG_INK, fs: 12.5 });
    s += figTxt(M[0] - 9, M[1] + 5, 'M', { a: 'end', c: FIG_INK, fs: 12.5 }) + figTxt(N[0] + 9, N[1] + 5, 'N', { a: 'start', c: FIG_INK, fs: 12.5 });
    s += figTxt(98, 52, '4 cm', { a: 'end' }) + figTxt((B[0] + C[0]) / 2, B[1] + 17, '7,5 cm');
    return { w: 272, h: 200, s };
  },
  cell() {
    const g = '#2E9D68';
    let s = `<ellipse cx="118" cy="98" rx="100" ry="72" fill="#E9F6EF" stroke="${g}" stroke-width="3.5"/>`;
    s += `<ellipse cx="160" cy="70" rx="11" ry="5" fill="${g}" opacity="0.28" transform="rotate(-20 160 70)"/><ellipse cx="152" cy="134" rx="12" ry="5" fill="${g}" opacity="0.28" transform="rotate(15 152 134)"/><ellipse cx="62" cy="128" rx="10" ry="4.5" fill="${g}" opacity="0.28" transform="rotate(-35 62 128)"/><circle cx="185" cy="102" r="4" fill="${g}" opacity="0.3"/><circle cx="48" cy="84" r="3.5" fill="${g}" opacity="0.3"/>`;
    s += `<ellipse cx="100" cy="90" rx="31" ry="26" fill="#C7EAD5" stroke="${g}" stroke-width="2"/><circle cx="109" cy="84" r="6" fill="${g}" opacity="0.55"/><path d="M84 92c4-6 8 4 12-2s7 4 11 0M88 102c5-4 9 3 13-1" fill="none" stroke="${g}" stroke-width="1.3" opacity="0.6" stroke-linecap="round"/>`;
    const lead = (x1, y1, y, n) => figLine(x1, y1, 252, y, FIG_INK, 1.3) + `<circle cx="${x1}" cy="${y1}" r="2.6" fill="${FIG_INK}"/><circle cx="264" cy="${y}" r="12" fill="#fff" stroke="${FIG_INK}" stroke-width="1.6"/>` + figTxt(264, y + 4.5, String(n), { c: FIG_INK, fs: 12.5 });
    s += lead(176, 39, 34, 1) + lead(186, 116, 98, 2) + lead(124, 106, 162, 3);
    return { w: 284, h: 190, s };
  },
  frise() {
    const x = yr => 22 + (yr - 1939) * 38, y = 86;
    let s = `<rect x="14" y="${y - 4}" width="${x(1946) - 8}" height="8" rx="4" fill="#FDE6EB"/>`;
    for (let yr = 1939; yr <= 1945; yr++) s += figLine(x(yr), y - 7, x(yr), y + 7, FIG_MUTE, 1.3) + figTxt(x(yr), y + 22, String(yr));
    [['A', 1939 + 8 / 12], ['B', 1941 + 5.5 / 12], ['C', 1944 + 5.2 / 12], ['D', 1945 + 4.2 / 12]].forEach(([l, yr]) => {
      const cx = x(yr);
      s += figLine(cx, y, cx, 52, '#E8506F', 2) + `<circle cx="${cx}" cy="${y}" r="4.5" fill="#E8506F"/><circle cx="${cx}" cy="38" r="13" fill="#fff" stroke="#E8506F" stroke-width="2.4"/>` + figTxt(cx, 42.5, l, { c: FIG_INK, fs: 13 });
    });
    return { w: x(1946) + 18, h: 124, s };
  },
};
// alt: accessible description (omit for a decorative thumbnail); standalone: a self-contained file for an <img> (dashboard).
function drawFigure(id, o = {}) {
  const f = FIGURES[id]();
  const a11y = o.alt ? `role="img" aria-label="${figEsc(o.alt)}"` : 'aria-hidden="true" focusable="false"';
  const own = o.standalone ? ` xmlns="http://www.w3.org/2000/svg" width="${f.w}" height="${f.h}" font-family="Quicksand, Segoe UI, system-ui, sans-serif" font-weight="700"` : '';
  return `<svg viewBox="0 0 ${f.w} ${f.h}"${own} ${a11y}>${o.standalone ? `<rect width="${f.w}" height="${f.h}" fill="#FFFFFF"/>` : ''}${f.s}</svg>`;
}
const figureDataURI = id => 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(drawFigure(id, { standalone: true }));
