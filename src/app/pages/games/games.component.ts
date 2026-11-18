import { Component } from '@angular/core';
import { ServicesComponent } from '../../sections/services/services.component';

// The /games page reuses the home-page Gaming section (game cards + streamers).
@Component({
  selector: 'app-games',
  standalone: true,
  imports: [ServicesComponent],
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent {}
