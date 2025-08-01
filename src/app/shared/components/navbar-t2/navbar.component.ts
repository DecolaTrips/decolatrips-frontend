import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { filter } from 'rxjs/operators';

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
export class NavbarComponent implements OnInit {
  isMobileMenuOpen = false;
  isProfileMenuOpen = false;
  userInitials = 'JJ'; // Junior Jonas
  currentRoute = '';
  
  navigationItems = [
    { name: 'Todos os Pacotes', href: '/todos-pacotes' },
    { name: 'Meus Pacotes', href: '/meus-pacotes' },
    { name: 'Dados Pessoais', href: '/dados-pessoais' }
  ];

  profileMenuItems = [
    { name: 'Seu Perfil', href: '#' },
    { name: 'Configurações', href: '#' },
    { name: 'Sair', href: '#' }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.url;
      });
    
    this.currentRoute = this.router.url;
  }

  isCurrentRoute(href: string): boolean {
    return this.currentRoute === href;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    this.isProfileMenuOpen = false;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  toggleProfileMenu(): void {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
    this.isMobileMenuOpen = false;
  }

  closeProfileMenu(): void {
    this.isProfileMenuOpen = false;
  }
}