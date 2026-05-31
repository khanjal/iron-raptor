import { Component, signal } from '@angular/core';
import { SITE_CONFIG } from '../../site.config';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.scss',
})
export class ActivitiesComponent {
  config = SITE_CONFIG;
  openCard = signal<string | null>(null);

  toggleCard(title: string): void {
    this.openCard.set(this.openCard() === title ? null : title);
  }
}
