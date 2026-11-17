import { Component, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SITE_CONFIG } from '../../site.config';

@Component({
  selector: 'app-activities-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './activities-page.component.html',
  styleUrls: ['./activities-page.component.scss'],
})
export class ActivitiesPageComponent implements OnInit {
  config = SITE_CONFIG;
  activities = SITE_CONFIG.activities?.items ?? [];
  openInlineSlug = signal<string | null>(null);
  inlineContent: { [slug: string]: SafeHtml } = {};
  loadingInline = signal(false);

  constructor(private sanitizer: DomSanitizer) {}

  openExternal(url: string | undefined) {
    if (!url) return;
    try { window.open(url, '_blank', 'noopener,noreferrer'); } catch {}
  }

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

  ngOnInit(): void {
    // Enrich activities items with parsed summaries (from src/assets/data/<slug>.json)
    this.loadSummaries(this.activities);
  }

  private async loadSummaries(items: any[]) {
    for (const item of items) {
      try {
        const slug = this.slugFor(item);
        if (!slug) continue;
        const res = await fetch(`/assets/data/${slug}.json`);
        if (!res.ok) continue;
        const data = await res.json();
        if (data.summary && (!item.description || !item.description.trim())) item.description = data.summary;
        if (data.images && data.images.length && !item.imagePath) {
          item.imagePath = data.images.find((i: string) => i.startsWith('/assets')) || data.images[0];
        }
        if (data.sections && data.sections.length && (!item.details || item.details.length === 0)) {
          item.details = data.sections.map((s: any) => s.heading ? `${s.heading}: ${s.text}` : s.text);
        }
        // Normalize image path to absolute form
        if (item.imagePath) item.imagePath = this.normalizeImagePath(item.imagePath);
      } catch (err) {
        // ignore missing or parse errors
      }
    }
  }

  private normalizeImagePath(p: string | undefined): string | undefined {
    if (!p) return p;
    const s = p.trim();
    if (s.startsWith('/') || /^https?:\/\//i.test(s) || s.startsWith('data:')) return s;
    if (s.startsWith('assets/')) return '/' + s;
    return s;
  }
}
