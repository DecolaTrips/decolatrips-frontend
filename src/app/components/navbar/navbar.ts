import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit, OnDestroy {
  isMobileMenuOpen = false;
  isLogged = false;
  username: string | null = null;
  private authSubscription!: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Verifica o estado inicial
    this.updateAuthState();

    // Se inscreve para mudanças futuras

  }

  private updateAuthState(): void {
    this.username = localStorage.getItem("username");
    this.isLogged = !!localStorage.getItem('jwt');
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (this.isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    document.body.style.overflow = '';
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
