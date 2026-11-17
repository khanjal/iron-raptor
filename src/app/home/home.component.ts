import { Component } from '@angular/core';
import { HeroComponent } from '../sections/hero/hero.component';
import { ServicesComponent } from '../sections/services/services.component';
import { ActivitiesComponent } from '../sections/activities/activities.component';
import { AboutComponent } from '../sections/about/about.component';
import { ContactComponent } from '../sections/contact/contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, ServicesComponent, ActivitiesComponent, AboutComponent, ContactComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
