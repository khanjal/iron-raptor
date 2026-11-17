// Import multiple pages from the old ironraptor.com site, download images,
// sanitize HTML and save into src/assets/data/<slug>.html
// Run: node scripts/import-pages.js

const fs = require('fs');
const path = require('path');

const PAGES = [
  { slug: 'geocaching', url: 'https://www.ironraptor.com/activities/geocaching/' , outHtml: path.join(process.cwd(), 'src', 'assets', 'data', 'geocaching.html'), outImgDir: path.join(process.cwd(), 'src', 'assets', 'images', 'activities', 'geocaching') },
];

async function ensureDir(dir) { await fs.promises.mkdir(dir, { recursive: true }); }

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return await res.text();
}

async function fetchBinary(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  const ab = await res.arrayBuffer();
  return Buffer.from(ab);
}

function sanitizeHtml(html, slug) {
  html = html.replace(/<script[\s\S]*?<\/script>/gi, '');
  html = html.replace(/ on[\w-]+=\"[\s\S]*?\"/gi, '');
  html = html.replace(/ on[\w-]+=\'[\s\S]*?\'/gi, '');
  html = html.replace(/<base[\s\S]*?>/gi, '');
  html = html.replace(/<link[^>]*rel=[\"']stylesheet[\"'][^>]*>/gi, '');
  // Remove references to the old domain so links/images don't point there
  html = html.replace(/https?:\/\/www\.ironraptor\.com/gi, '');
  html = html.replace(/https?:\/\/ironraptor\.com/gi, '');

  // Remove inline event handlers and meta-refresh
  html = html.replace(/<meta[^>]*http-equiv=[\"']refresh[\"'][^>]*>/gi, '');

  return html;
}

async function importPage(page) {
  console.log('Fetching', page.url);
  const raw = await fetchText(page.url);

  await ensureDir(path.dirname(page.outHtml));
  await ensureDir(page.outImgDir);

  // find image srcs
  const imgRegex = /<img[^>]*src=["']([^"']+)["'][^>]*>/gi;
  const imgs = new Set();
  let m;
  while ((m = imgRegex.exec(raw)) !== null) imgs.add(m[1]);

  let html = raw;
  console.log(`Found ${imgs.size} images for ${page.slug}`);

  for (const src of imgs) {
    try {
      if (/^data:/i.test(src)) { html = html.split(src).join(src); continue; }
      const imgUrl = src.startsWith('http') ? src : new URL(src, page.url).href;
      const urlObj = new URL(imgUrl);
      const filename = path.basename(urlObj.pathname) || 'image.png';
      const outPath = path.join(page.outImgDir, filename);
      console.log('Downloading', imgUrl, '->', outPath);
      const buf = await fetchBinary(imgUrl);
      await fs.promises.writeFile(outPath, buf);
      const rel = path.posix.join('/assets', 'images', page.slug, filename);
      html = html.split(src).join(rel);
    } catch (err) {
      console.error('Failed to download image', src, err.message);
    }
  }

  const sanitized = sanitizeHtml(html, page.slug);
  await fs.promises.writeFile(page.outHtml, sanitized, 'utf8');
  console.log('Wrote', page.outHtml);
}

(async () => {
  for (const p of PAGES) {
    try {
      await importPage(p);
    } catch (err) { console.error('Error importing', p.slug, err.message); }
  }
  console.log('All done.');
})();
