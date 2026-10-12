// Bundles page.html + app.css + logos.js + ../web/assets/figures.js (shared with the dashboard) + data.js + app.js into:
//   dist/educazenkids-college.html  (artifact body: no doctype, the publisher adds it)
//   dist/preview.html               (standalone document, opens in any browser)
const fs = require('fs');
const path = require('path');

const dir = __dirname;
const read = f => fs.readFileSync(path.join(dir, f), 'utf8');
const page = read('page.html')
  .replace('/*CSS*/', () => read('app.css'))
  .replace('/*LOGOS*/', () => read('logos.js'))
  .replace('/*FIGURES*/', () => read('../web/assets/figures.js'))
  .replace('/*DATA*/', () => read('data.js'))
  .replace('/*APP*/', () => read('app.js'));

const out = path.join(dir, 'dist');
fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(path.join(out, 'educazenkids-college.html'), page);
const standalone = '<!doctype html>\n<html lang="fr">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n</head>\n<body>\n' + page + '\n</body>\n</html>\n';
fs.writeFileSync(path.join(out, 'preview.html'), standalone);
fs.writeFileSync(path.join(out, '_all.js'), read('logos.js') + '\n' + read('../web/assets/figures.js') + '\n' + read('data.js') + '\n' + read('app.js')); // used by test.js
console.log('bytes', Buffer.byteLength(page));
