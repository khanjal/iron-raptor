import { Component, HostListener, inject, signal } from '@angular/core';
import { SITE_CONFIG } from '../site.config';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  config = SITE_CONFIG;
  mobileOpen = signal(false);
  openDropdown = signal<string | null>(null);

  private router = inject(Router);

  toggleMobile() {
    this.mobileOpen.set(!this.mobileOpen());
  }

  toggleDropdown(event: Event, label: string) {
    event.stopPropagation();
    this.openDropdown.set(this.openDropdown() === label ? null : label);
  }

  linkFor(item: { routerLink?: string }) {
    return item.routerLink ?? '/';
  }

  closeMenus() {
    this.mobileOpen.set(false);
    this.openDropdown.set(null);
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.closeMenus();
  }

  navClick(event: Event, item: { fragment?: string; routerLink?: string; externalUrl?: string }) {
    event.preventDefault();
    event.stopPropagation();
    this.mobileOpen.set(false);
    this.openDropdown.set(null);

    if (item.externalUrl) {
      window.open(item.externalUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    if (item.routerLink) {
      this.router.navigate([item.routerLink]);
      return;
    }
    if (item.fragment) {
      this.router.navigate(['/'], { fragment: item.fragment });
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(_event: Event) {
    if (this.mobileOpen()) this.mobileOpen.set(false);
    if (this.openDropdown()) this.openDropdown.set(null);
  }
}
