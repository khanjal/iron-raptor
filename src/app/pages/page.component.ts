import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SITE_CONFIG, Page } from '../site.config';

@Component({
  selector: 'app-site-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent {
  config = SITE_CONFIG;
  page: Page | null = null;

  private route = inject(ActivatedRoute);

  constructor() {
    const slug = this.route.snapshot.paramMap.get('slug') || '';
    this.page = (this.config.pages ?? []).find(p => p.slug === slug) ?? null;
  }
}
