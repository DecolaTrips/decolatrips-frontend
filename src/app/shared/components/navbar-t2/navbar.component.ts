import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, ClickOutsideDirective],
  templateUrl: './navbar.component.html',
  styles: [`
    .size-6 {
      width: 1.5rem;
      height: 1.5rem;
    }
    
    .size-8 {
      width: 2rem;
      height: 2rem;
    }
  `]
})
export class NavbarComponent implements OnInit, OnDestroy {
  isMobileMenuOpen = false;
  isProfileMenuOpen = false;
  userInitials = 'JJ'; // Default initials
  currentRoute = '';
  username: string | null = null;

  profileMenuItems = [
    { name: 'Meus Pacotes', href: '/meus-pacotes' },
    { name: 'Dados Pessoais', href: '/dados-pessoais' },
    { name: 'Sair', href: '/' }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.url;
      });

    this.currentRoute = this.router.url;
    this.updateUserInfo();
  }

  ngOnDestroy(): void {
    // Clean up any subscriptions if needed
  }

  private updateUserInfo(): void {
    this.username = localStorage.getItem("username");
    if (this.username) {
      // Generate initials from username
      const names = this.username.split(' ');
      if (names.length >= 2) {
        this.userInitials = names[0].charAt(0).toUpperCase() + names[1].charAt(0).toUpperCase();
      } else {
        this.userInitials = this.username.substring(0, 2).toUpperCase();
      }
    }
  }

  isCurrentRoute(href: string): boolean {
    return this.currentRoute === href;
  }

  logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('roles');

    this.router.navigate(['/']);
  }

  menuRedirect(item: any): void {
    if (item.name === 'Sair') {
      this.logout();
    } else {
      this.router.navigate([item.href]);
    }
    this.closeProfileMenu();
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    this.isProfileMenuOpen = false;
    
    if (this.isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    document.body.style.overflow = '';
  }

  toggleProfileMenu(): void {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
    this.isMobileMenuOpen = false;
  }

  closeProfileMenu(): void {
    this.isProfileMenuOpen = false;
  }
}