import { Component } from '@angular/core';
import { HeroComponent } from '../sections/hero/hero.component';
import { ServicesComponent } from '../sections/services/services.component';
import { AboutComponent } from '../sections/about/about.component';
import { InfoComponent } from '../sections/info/info.component';
import { TestimonialsComponent } from '../sections/testimonials/testimonials.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, ServicesComponent, InfoComponent, AboutComponent, TestimonialsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
