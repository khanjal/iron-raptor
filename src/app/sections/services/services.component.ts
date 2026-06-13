import { Component, OnDestroy, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SITE_CONFIG, StreamPlatform } from 'app/site.config';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnDestroy {
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
    return 'gaming-card-' + title.toLowerCase().replace(/\s+/g, '-');
  }

  streamerUrl(platform: StreamPlatform, streamer: { name: string; username?: string }): string {
    const handle = streamer.username ?? streamer.name.toLowerCase().replace(/\s+/g, '');
    switch (platform) {
      case 'twitch':  return `https://www.twitch.tv/${handle}`;
      case 'youtube': return `https://www.youtube.com/@${handle}`;
      case 'rumble':  return `https://rumble.com/c/${handle}`;
      default: return '';
    }
  }

  platformLabel(platform: StreamPlatform): string {
    const labels: Record<StreamPlatform, string> = {
      twitch:  'Twitch',
      youtube: 'YouTube',
      rumble:  'Rumble',
    };
    return labels[platform];
  }
}
