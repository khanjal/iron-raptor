import { Component, signal } from '@angular/core';
import { SITE_CONFIG } from '../../site.config';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent {
  config = SITE_CONFIG;
  openCard = signal<string | null>(null);

  toggleCard(title: string): void {
    this.openCard.set(this.openCard() === title ? null : title);
  }
}
