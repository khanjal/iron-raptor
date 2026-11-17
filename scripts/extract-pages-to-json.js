// Extract useful summary data from imported HTML pages and write JSON summaries.
// Run: node scripts/extract-pages-to-json.js

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(process.cwd(), 'src', 'assets', 'data');

function stripTags(s) {
  if (!s) return '';
  return s.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
}

function parseHtmlFile(filePath) {
  const html = fs.readFileSync(filePath, 'utf8');
  const slug = path.basename(filePath, '.html');

  // Title: <title> or first <h1>
  let title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || '';
  if (!title) title = (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [])[1] || '';
  title = stripTags(title || '');

  // Summary: first <p> in the document body
  let summary = (html.match(/<body[^>]*>[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/i) || [])[1] || '';
  if (!summary) summary = (html.match(/<p[^>]*>([\s\S]*?)<\/p>/i) || [])[1] || '';
  summary = stripTags(summary || '');

  // Images: collect <img src=> occurrences and normalize to actual asset paths when possible
  const images = [];
  const imgRe = /<img[^>]*src=["']([^"']+)["'][^>]*>/gi;
  let m;
  while ((m = imgRe.exec(html)) !== null) {
    images.push(normalizeImage(m[1], slug));
  }

  // Links
  const links = [];
  const aRe = /<a[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  while ((m = aRe.exec(html)) !== null) links.push({ href: m[1], text: stripTags(m[2]) });

  // Sections: capture h2/h3 and following block
  const sections = [];
  const sectionRe = /<(h[23])[^>]*>([\s\S]*?)<\/\1>([\s\S]*?)(?=(?:<(?:h[23])[^>]*>)|$)/gi;
  while ((m = sectionRe.exec(html)) !== null) {
    const heading = stripTags(m[2]);
    const block = m[3] || '';
    const paras = [];
    const pRe = /<p[^>]*>([\s\S]*?)<\/p>/gi;
    let p;
    while ((p = pRe.exec(block)) !== null) paras.push(stripTags(p[1]));
    const imgsInBlock = [];
    const imgRe2 = /<img[^>]*src=["']([^"']+)["'][^>]*>/gi;
    let ii;
    while ((ii = imgRe2.exec(block)) !== null) imgsInBlock.push(normalizeImage(ii[1], slug));
    sections.push({ heading, text: paras.join('\n\n'), images: imgsInBlock });
  }

  return { slug, title, summary, sections, images, links };
}

function normalizeImage(src, slug) {
  if (!src) return src;
  // If absolute URL, return as-is
  if (/^https?:\/\//i.test(src) || /^data:/i.test(src)) return src;
  const filename = path.basename(src.split('?')[0] || src);
  const candidates = [
    `/assets/images/${slug}/${filename}`,
    `/assets/images/activities/${slug}/${filename}`,
    `/assets/images/games/${slug}/${filename}`,
    `/assets/images/${filename}`,
    `/assets/images/activities/${filename}`,
    `/assets/images/games/${filename}`,
  ];
  for (const c of candidates) {
    const abs = path.join(process.cwd(), 'src', c.replace(/^\//, ''));
    if (fs.existsSync(abs)) return c;
  }
  // fallback: if src already starts with /assets use it, otherwise prefer assets path with slug
  if (src.startsWith('/assets')) return src;
  return `/assets/images/${slug}/${filename}`;
}

function main() {
  if (!fs.existsSync(DATA_DIR)) {
    console.error('Data directory not found:', DATA_DIR);
    process.exit(1);
  }

  const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.html'));
  for (const f of files) {
    try {
      const p = path.join(DATA_DIR, f);
      console.log('Parsing', p);
      const parsed = parseHtmlFile(p);
      const out = path.join(DATA_DIR, f.replace(/\.html$/, '.json'));
      fs.writeFileSync(out, JSON.stringify(parsed, null, 2), 'utf8');
      console.log('Wrote', out);
    } catch (err) {
      console.error('Failed to parse', f, err && err.message);
    }
  }
}

main();
