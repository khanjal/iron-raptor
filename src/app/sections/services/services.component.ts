import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE_CONFIG, StreamPlatform } from '../../site.config';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent {
  config = SITE_CONFIG;

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
    const labels: Record<StreamPlatform, string> = { twitch: 'Twitch', youtube: 'YouTube', rumble: 'Rumble' };
    return labels[platform];
  }
}
