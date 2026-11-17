import { Component, OnDestroy, inject, signal, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SITE_CONFIG } from '../../site.config';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.scss',
})
export class ActivitiesComponent implements OnDestroy, OnInit {
  private doc = inject(DOCUMENT);
  private scrollTimer: ReturnType<typeof setTimeout> | null = null;

  config = SITE_CONFIG;
  openCard = signal<string | null>(null);

  ngOnDestroy(): void {
    if (this.scrollTimer) clearTimeout(this.scrollTimer);
  }

  ngOnInit(): void {
    // Normalize existing image paths and enrich the homepage activity cards with parsed summaries
    const items = this.config.activities?.items || [];
    for (const it of items) { if (it.imagePath) it.imagePath = this.normalizeImagePath(it.imagePath); }
    this.loadSummaries(items);
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
        if (item.imagePath) item.imagePath = this.normalizeImagePath(item.imagePath);
      } catch (err) {
        // ignore
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

  private slugFor(item: any) {
    if (item?.routerLink) {
      const parts = item.routerLink.split('/').filter(Boolean);
      return parts.length ? parts[parts.length - 1] : item.title?.toLowerCase().replace(/\s+/g, '-');
    }
    return item.title?.toLowerCase().replace(/\s+/g, '-') ?? '';
  }

  toggleCard(title: string): void {
    const opening = this.openCard() !== title;
    this.openCard.set(opening ? title : null);
    if (opening) {
      if (this.scrollTimer) clearTimeout(this.scrollTimer);
      this.scrollTimer = setTimeout(() => {
        this.doc.getElementById(this.cardId(title))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  }

  cardId(title: string): string {
    return 'activity-card-' + title.toLowerCase().replace(/\s+/g, '-');
  }
}
