import { Component, HostListener, inject } from '@angular/core';
import { SITE_CONFIG } from '../site.config';
import { ThemeService } from '../shared/services/theme.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  config = SITE_CONFIG;
  mobileOpen = false;

  theme = inject(ThemeService);
  private router = inject(Router);

  toggleMobile() {
    this.mobileOpen = !this.mobileOpen;
  }

  mobileNavigate(event: Event, fragmentOrPath: string) {
    event.preventDefault();
    event.stopPropagation();
    this.mobileOpen = false;

    // If this looks like a route path, navigate; otherwise scroll to an ID on the page
    if (fragmentOrPath && fragmentOrPath.startsWith('/')) {
      // Use navigateByUrl for absolute path strings to avoid incorrect segment parsing
      setTimeout(() => this.router.navigateByUrl(fragmentOrPath), 80);
      return;
    }

    // Navigate to home with the fragment; anchorScrolling handles the scroll
    setTimeout(() => this.router.navigate(['/'], { fragment: fragmentOrPath }), 80);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(_event: Event) {
    if (this.mobileOpen) {
      this.mobileOpen = false;
    }
  }
}
