// Simple import script: fetch laser commandos games page, download images,
// sanitize HTML (remove external links to khanjal.com), and save locally.
// Run: node scripts/import-laser.js

const fs = require('fs');
const path = require('path');

const PAGE_URL = 'https://khanjal.com/lasertag/lasercommandos_games.html';
const OUT_HTML = path.join(process.cwd(), 'src', 'assets', 'data', 'lasercommandos_games.html');
const OUT_IMG_DIR = path.join(process.cwd(), 'src', 'assets', 'images', 'activities', 'lasercommandos');

async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true });
}

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

function sanitizeHtml(html) {
  // Remove script tags
  html = html.replace(/<script[\s\S]*?<\/script>/gi, '');
  // Remove inline on* attributes
  html = html.replace(/ on[\w-]+=["'][\s\S]*?["']/gi, '');
  // Remove meta refresh or base tags
  html = html.replace(/<base[\s\S]*?>/gi, '');
  // Rewrite absolute links to khanjal.com to hashes
  html = html.replace(/href=["']https?:\/\/(?:www\.)?khanjal\.com[^"']*["']/gi, 'href="#"');
  // Remove other external JS/CSS references (keep inline styling)
  html = html.replace(/<link[^>]*rel=["']stylesheet["'][^>]*>/gi, '');
  // Strip other references to khanjal.com in text nodes
  html = html.replace(/https?:\/\/(?:www\.)?khanjal\.com/g, '');
  return html;
}

async function main() {
  console.log('Fetching page:', PAGE_URL);
  const raw = await fetchText(PAGE_URL);

  console.log('Ensuring output directories');
  await ensureDir(path.dirname(OUT_HTML));
  await ensureDir(OUT_IMG_DIR);

  // Find image srcs
  const imgRegex = /<img[^>]*src=["']([^"']+)["'][^>]*>/gi;
  const imgs = new Set();
  let m;
  while ((m = imgRegex.exec(raw)) !== null) {
    imgs.add(m[1]);
  }

  console.log(`Found ${imgs.size} image(s)`);

  let html = raw;

  for (const src of imgs) {
    try {
      // Ignore data URIs
      if (/^data:/i.test(src)) {
        html = html.replace(new RegExp(src.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), src);
        continue;
      }
      // Normalize relative URLs
      const imgUrl = src.startsWith('http') ? src : new URL(src, PAGE_URL).href;
      const urlObj = new URL(imgUrl);
      const filename = path.basename(urlObj.pathname) || 'image.png';
      const outPath = path.join(OUT_IMG_DIR, filename);
      console.log('Downloading', imgUrl, '->', outPath);
      const buf = await fetchBinary(imgUrl);
      await fs.promises.writeFile(outPath, buf);
      const relPath = path.posix.join('/assets/images/activities/lasercommandos', filename);
      // Replace occurrences of the image URL in HTML with the relative path
      html = html.split(src).join(relPath);
    } catch (err) {
      console.error('Error fetching image', src, err.message);
    }
  }

  const sanitized = sanitizeHtml(html);
  await fs.promises.writeFile(OUT_HTML, sanitized, 'utf8');
  console.log('Wrote sanitized HTML to', OUT_HTML);
  console.log('Import complete.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
