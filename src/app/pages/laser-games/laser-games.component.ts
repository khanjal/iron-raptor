import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE_CONFIG } from '../../site.config';

interface LaserEvent {
  date: string;
  time: string;
  location: string;
  note: string | null;
  participantsCount: number | null;
  participantsText: string;
  pics: string[];
}
interface LaserMonth { month: string; events: LaserEvent[]; }
interface LaserYear { year: string | null; gamesCount: number | null; summary: string; months: LaserMonth[]; }

const stripTags = (s: string): string =>
  s.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();

function extractTDs(tr: string): string[] {
  // Tolerate unclosed <TD>: each cell runs to its </TD> or, failing that, the next <TD>/end of row.
  return tr.split(/<TD[^>]*>/i).slice(1).map((c) => c.replace(/<\/TD>[\s\S]*$/i, ''));
}

function parseYearBlock(block: string): LaserYear {
  const year = /Year\s*(\d{4})/i.exec(block)?.[1] ?? null;
  const gm = /-\s*([0-9]+)\s*Games?/i.exec(block);
  const sm = /Year\s*\d{4}[\s\S]*?<TD[^>]*CLASS="LASERTAG_TD_BACKGROUND_3"[^>]*>([\s\S]*?)<\/TD>/i.exec(block);
  const months: LaserMonth[] = [];
  let current: LaserMonth | null = null;
  for (const m of block.matchAll(/<TR>((?:(?!<TR>)[\s\S])*?)(?:<\/TR>|(?=<TR>)|$)/gi)) {
    const tds = extractTDs(m[1]);
    if (tds.length === 1 && /<B>/i.test(tds[0])) {
      current = { month: stripTags(tds[0]), events: [] };
      months.push(current);
      continue;
    }
    if (tds.length >= 1 && /<B>\s*Date\s*<\/B>/i.test(tds[0])) continue;
    // Second game under a ROWSPAN="2" date has only 3 cells: reuse the previous date.
    let cells = tds;
    if (tds.length === 3 && current && current.events.length) {
      cells = [current.events[current.events.length - 1].date, ...tds];
    }
    if (cells.length >= 4) {
      if (cells.slice(0, 4).every((c) => /^\s*None\s*$/i.test(stripTags(c)))) continue;
      const tds = cells;
      const note = /<FONT[^>]*COLOR=["']red["'][^>]*>([\s\S]*?)<\/FONT>/i.exec(tds[2]);
      const cm = /\{\s*(\d+)\s*\}/.exec(tds[3]);
      const pics = [...tds[3].matchAll(/<A[^>]*>(Pic\s*\d+)<\/A>/gi)].map((p) => stripTags(p[1]));
      if (!current) { current = { month: 'Unknown', events: [] }; months.push(current); }
      current.events.push({
        date: stripTags(tds[0]),
        time: stripTags(tds[1]),
        location: stripTags(tds[2]),
        note: note ? stripTags(note[1]) : null,
        participantsCount: cm ? parseInt(cm[1], 10) : null,
        participantsText: stripTags(tds[3]),
        pics,
      });
    }
  }
  // Count the games actually listed: the old page's year headers are stale.
  const listed = months.reduce((n, mo) => n + mo.events.length, 0);
  return { year, gamesCount: listed || (gm ? parseInt(gm[1], 10) : null), summary: sm ? stripTags(sm[1]) : '', months: months.filter((mo) => mo.events.length) };
}

@Component({
  selector: 'app-laser-games',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './laser-games.component.html',
  styleUrls: ['./laser-games.component.scss'],
})
export class LaserGamesComponent implements OnInit {
  config = SITE_CONFIG;
  years: LaserYear[] = [];
  loading = true;
  error: string | null = null;

  async ngOnInit(): Promise<void> {
    try {
      const res = await fetch('/assets/data/lasercommandos_games.json');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (Array.isArray(data?.years) && data.years.length) {
        // Structured shape: { years: [...] }
        this.years = data.years;
      } else {
        // Current shape ({ slug, title, sections, images, links }) carries no game rows,
        // so derive the list from the imported HTML source.
        this.years = await this.loadFromHtml(data);
      }
      if (!this.years.length) this.error = 'No games found in the imported log.';
    } catch {
      this.error = 'Failed to load laser games.';
    } finally {
      this.loading = false;
    }
  }

  private async loadFromHtml(data: any): Promise<LaserYear[]> {
    // Prefer anchor years from JSON links (#2000...) only as a hint; parse the HTML for the rows.
    void data;
    const res = await fetch('/assets/data/lasercommandos_games.html');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    const anchors = [...html.matchAll(/<A NAME="(\d{4})">/gi)];
    return anchors.map((a, i) =>
      parseYearBlock(html.slice(a.index!, i + 1 < anchors.length ? anchors[i + 1].index! : html.length)));
  }
}
