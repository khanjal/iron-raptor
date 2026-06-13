import { Component, OnDestroy, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SITE_CONFIG } from '../../site.config';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.scss',
})
export class ActivitiesComponent implements OnDestroy {
  private doc = inject(DOCUMENT);
  private scrollTimer: ReturnType<typeof setTimeout> | null = null;

  config = SITE_CONFIG;
  openCard = signal<string | null>(null);

  ngOnDestroy(): void {
    if (this.scrollTimer) clearTimeout(this.scrollTimer);
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
