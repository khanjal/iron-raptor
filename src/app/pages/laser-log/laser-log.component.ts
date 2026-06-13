import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
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
  content: SafeHtml | null = null;
  config = SITE_CONFIG;

  constructor(private sanitizer: DomSanitizer) {}

  async ngOnInit(): Promise<void> {
    try {
      const res = await fetch('/assets/data/lasercommandos_games.html');
      const html = await res.text();
      this.content = this.sanitizer.bypassSecurityTrustHtml(html);
    } catch (err) {
      this.content = this.sanitizer.bypassSecurityTrustHtml('<p class="text-text-secondary">Could not load laser log.</p>');
    }
  }
}
