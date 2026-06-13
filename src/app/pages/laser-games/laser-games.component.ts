import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE_CONFIG } from '../../site.config';

@Component({
  selector: 'app-laser-games',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './laser-games.component.html',
  styleUrls: ['./laser-games.component.scss'],
})
export class LaserGamesComponent implements OnInit {
  config = SITE_CONFIG;
  data: any = null;
  loading = true;
  error: string | null = null;

  async ngOnInit(): Promise<void> {
    try {
      const res = await fetch('/assets/data/lasercommandos_games.json');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      this.data = await res.json();
    } catch (e) {
      this.error = 'Failed to load laser games.';
    } finally {
      this.loading = false;
    }
  }
}
