// Parse the sanitized lasercommandos_games.html into structured JSON.
// Usage: node scripts/convert-laser-to-json.js

const fs = require('fs');
const path = require('path');

const IN_HTML = path.join(process.cwd(), 'src', 'assets', 'data', 'lasercommandos_games.html');
const OUT_JSON = path.join(process.cwd(), 'src', 'assets', 'data', 'lasercommandos_games.json');

function stripTags(s) {
  return s.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
}

function extractTDs(tr) {
  const tdRegex = /<TD[^>]*>([\s\S]*?)<\/TD>/gi;
  const tds = [];
  let m;
  while ((m = tdRegex.exec(tr)) !== null) {
    tds.push(m[1]);
  }
  return tds;
}

function parseYearBlock(block) {
  const yearMatch = /Year\s*(\d{4})/i.exec(block);
  const gamesMatch = /-\s*([0-9]+)\s*Games/i.exec(block);
  const year = yearMatch ? yearMatch[1] : null;
  const gamesCount = gamesMatch ? parseInt(gamesMatch[1], 10) : null;
  const summaryMatch = /Year\s*\d{4}[\s\S]*?<TD[^>]*CLASS="LASERTAG_TD_BACKGROUND_3"[^>]*>([\s\S]*?)<\/TD>/i.exec(block);
  const summary = summaryMatch ? stripTags(summaryMatch[1]) : '';

  const rows = [...block.matchAll(/<TR>([\s\S]*?)<\/TR>/gi)].map(m => m[1]);
  const months = [];
  let currentMonth = null;

  for (const row of rows) {
    const tds = extractTDs(row);
    // Month header: single TD with B tag
    if (tds.length === 1 && /<B>/.test(tds[0])) {
      const month = stripTags(tds[0]);
      currentMonth = { month, events: [] };
      months.push(currentMonth);
      continue;
    }

    // Skip table header rows (Date, Time, Location, Participants)
    if (tds.length >= 1 && /<B>\s*Date\s*<\/B>/i.test(tds[0])) continue;

    // Event rows: expect at least 4 TDs
    if (tds.length >= 4) {
      const date = stripTags(tds[0]);
      const time = stripTags(tds[1]);
      // Location may contain <FONT COLOR="red"> notes
      const locationHtml = tds[2];
      let location = stripTags(locationHtml);
      let note = null;
      const noteMatch = /<FONT[^>]*COLOR=["']red["'][^>]*>([\s\S]*?)<\/FONT>/i.exec(locationHtml);
      if (noteMatch) note = stripTags(noteMatch[1]);

      const participantsHtml = tds[3];
      const participantsText = stripTags(participantsHtml);
      const countMatch = /\{\s*(\d+)\s*\}/.exec(participantsHtml);
      const participantsCount = countMatch ? parseInt(countMatch[1], 10) : null;

      const pics = [];
      const picRegex = /<A[^>]*>(Pic\s*\d+)<\/A>/gi;
      let pm;
      while ((pm = picRegex.exec(participantsHtml)) !== null) {
        pics.push(stripTags(pm[1]));
      }

      const evt = { date, time, location, note, participantsCount, participantsText, pics };
      if (!currentMonth) {
        currentMonth = { month: 'Unknown', events: [] };
        months.push(currentMonth);
      }
      currentMonth.events.push(evt);
    }
  }

  return { year, gamesCount, summary, months };
}

function main() {
  if (!fs.existsSync(IN_HTML)) {
    console.error('Input HTML not found at', IN_HTML);
    process.exit(1);
  }
  const html = fs.readFileSync(IN_HTML, 'utf8');

  const anchorRegex = /<A NAME="(\d{4})">/gi;
  const anchors = [...html.matchAll(anchorRegex)];
  const results = [];

  for (let i = 0; i < anchors.length; i++) {
    const start = anchors[i].index;
    const end = i + 1 < anchors.length ? anchors[i + 1].index : html.length;
    const block = html.slice(start, end);
    const parsed = parseYearBlock(block);
    results.push(parsed);
  }

  fs.writeFileSync(OUT_JSON, JSON.stringify({ years: results }, null, 2), 'utf8');
  console.log('Wrote JSON to', OUT_JSON);
}

main();
