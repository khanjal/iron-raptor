import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SITE_CONFIG } from '../../site.config';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent {
  config = SITE_CONFIG;
  gaming = SITE_CONFIG.gaming ?? { items: [] };

  openInlineSlug = signal<string | null>(null);
  inlineContent: { [slug: string]: SafeHtml } = {};
  loadingInline = signal(false);

  constructor(private sanitizer: DomSanitizer) {}

  slugFor(item: any) {
    if (item?.routerLink) {
      const parts = item.routerLink.split('/').filter(Boolean);
      return parts.length ? parts[parts.length - 1] : item.title?.toLowerCase().replace(/\s+/g, '-');
    }
    return item.title?.toLowerCase().replace(/\s+/g, '-') ?? '';
  }

  async openInline(item: any) {
    const slug = this.slugFor(item);
    if (!slug) return;
    if (this.openInlineSlug() === slug) { this.openInlineSlug.set(null); return; }
    if (!this.inlineContent[slug]) {
      this.loadingInline.set(true);
      try {
        const res = await fetch(`/assets/data/${slug}.html`);
        const html = await res.text();
        this.inlineContent[slug] = this.sanitizer.bypassSecurityTrustHtml(html);
      } catch (err) {
        this.inlineContent[slug] = this.sanitizer.bypassSecurityTrustHtml('<p class="text-text-secondary">Could not load page.</p>');
      } finally {
        this.loadingInline.set(false);
      }
    }
    this.openInlineSlug.set(slug);
  }

  openExternal(url: string | undefined) {
    if (!url) return;
    try { window.open(url, '_blank', 'noopener,noreferrer'); } catch { /* noop */ }
  }
}
