import { Component, HostListener, inject, signal } from '@angular/core';
import { SITE_CONFIG } from '../site.config';
import { ThemeService } from '../shared/services/theme.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  config = SITE_CONFIG;
  mobileOpen = false;
  openDropdown = signal<string | null>(null);

  theme = inject(ThemeService);
  private router = inject(Router);

  toggleMobile() {
    this.mobileOpen = !this.mobileOpen;
  }

  toggleDropdown(event: Event, label: string) {
    event.stopPropagation();
    this.openDropdown.set(this.openDropdown() === label ? null : label);
  }

  navClick(event: Event, item: { fragment?: string; externalUrl?: string }) {
    event.preventDefault();
    event.stopPropagation();
    this.mobileOpen = false;
    this.openDropdown.set(null);

    if (item.externalUrl) {
      window.open(item.externalUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    if (item.fragment) {
      this.router.navigate(['/'], { fragment: item.fragment });
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(_event: Event) {
    if (this.mobileOpen) this.mobileOpen = false;
    if (this.openDropdown()) this.openDropdown.set(null);
  }
}
