import { cleanImportedHtml } from '../../shared/utils/clean-html';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE_CONFIG } from '../../site.config';

@Component({
  selector: 'app-geocaching',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './geocaching.component.html',
  styleUrls: ['./geocaching.component.scss'],
})
export class GeocachingComponent implements OnInit {
  content: string | null = null;
  config = SITE_CONFIG;

  async ngOnInit(): Promise<void> {
    try {
      const res = await fetch('/assets/data/geocaching.html');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const html = await res.text();
      this.content = cleanImportedHtml(html);
    } catch (err) {
      this.content = '<p class="text-text-secondary">Could not load geocaching page.</p>';
    }
  }
}
