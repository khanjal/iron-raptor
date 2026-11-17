import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

/**
 * The site uses a single dark theme (colours live in src/styles.scss).
 * Kept as a service so app.config's initializer keeps working.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private document = inject(DOCUMENT);

  initialize(): void {
    this.document.documentElement.classList.add('theme-dark');
  }
}
