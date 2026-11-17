import { cleanImportedHtml } from '../../shared/utils/clean-html';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE_CONFIG } from '../../site.config';

@Component({
  selector: 'app-laser-log',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './laser-log.component.html',
  styleUrls: ['./laser-log.component.scss'],
})
export class LaserLogComponent implements OnInit {
  content: string | null = null;
  config = SITE_CONFIG;

  async ngOnInit(): Promise<void> {
    try {
      const res = await fetch('/assets/data/lasercommandos_games.html');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const html = await res.text();
      this.content = cleanImportedHtml(html);
    } catch (err) {
      this.content = '<p class="text-text-secondary">Could not load laser log.</p>';
    }
  }
}
