import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

interface GameLine { text: string; href?: string; note?: string }
interface GameData {
  slug: string; title: string; icon?: string; summary: string;
  sections: { heading: string; lines: GameLine[] }[];
}

// One page for every game; content comes from src/assets/data/games/<slug>.json
@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './game-page.component.html',
})
export class GamePageComponent {
  game = signal<GameData | null>(null);
  state = signal<'loading' | 'ready' | 'missing'>('loading');

  constructor() {
    const slug = inject(ActivatedRoute).snapshot.paramMap.get('slug') ?? '';
    this.load(slug);
  }

  private async load(slug: string): Promise<void> {
    try {
      if (!/^[a-z0-9-]+$/.test(slug)) throw new Error('bad slug');
      const res = await fetch(`/assets/data/games/${slug}.json`);
      if (!res.ok) throw new Error('not found');
      this.game.set(await res.json());
      this.state.set('ready');
    } catch {
      this.state.set('missing');
    }
  }
}
