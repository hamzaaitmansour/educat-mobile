(function () {
  const n = parseInt((location.hash || '').replace('#export-', ''), 10);
  if (isNaN(n)) return;
  const [label, patch] = GALLERY[n];
  // The page's <style> and font <link> live in <body>: move them to <head> before replacing the body.
  document.querySelectorAll('body style, body link[rel="stylesheet"], body link[rel="preconnect"]').forEach(el => document.head.appendChild(el));
  document.body.style.background = '#F3EFF8';
  document.body.style.margin = '0';
  document.body.innerHTML = '<div class="phone" style="border-radius:0;box-shadow:none;margin:0">' + phoneInner(Object.assign(S0(), patch, { gallery: true })) + '</div>';
  document.title = label;
  const draw = () => document.querySelectorAll('canvas[data-video]').forEach(cv => drawVideo(cv, LMAP[cv.dataset.video], +cv.dataset.t, true));
  draw();
  if (document.fonts) document.fonts.ready.then(draw);
})();
