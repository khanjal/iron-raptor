import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
    inject(ActivatedRoute).paramMap
      .pipe(takeUntilDestroyed())
      .subscribe((p) => this.load(p.get('slug') ?? ''));
  }

  private seq = 0;

  private async load(slug: string): Promise<void> {
    const id = ++this.seq;
    this.game.set(null);
    this.state.set('loading');
    try {
      if (!/^[a-z0-9-]+$/.test(slug)) throw new Error('bad slug');
      const res = await fetch(`/assets/data/games/${slug}.json`);
      if (!res.ok) throw new Error('not found');
      const data = await res.json();
      if (id !== this.seq) return;
      this.game.set(data);
      this.state.set('ready');
    } catch {
      if (id === this.seq) this.state.set('missing');
    }
  }
}
