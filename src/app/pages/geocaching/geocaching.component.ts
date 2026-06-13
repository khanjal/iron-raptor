import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
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
  content: SafeHtml | null = null;
  config = SITE_CONFIG;

  constructor(private sanitizer: DomSanitizer) {}

  async ngOnInit(): Promise<void> {
    try {
      const res = await fetch('/assets/data/geocaching.html');
      const html = await res.text();
      this.content = this.sanitizer.bypassSecurityTrustHtml(html);
    } catch (err) {
      this.content = this.sanitizer.bypassSecurityTrustHtml('<p class="text-text-secondary">Could not load geocaching page.</p>');
    }
  }
}
