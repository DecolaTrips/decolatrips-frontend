import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  isMobileMenuOpen: boolean = false;

  constructor(private router: Router) {}

  toggleMobileMenu(): void {
    console.log('Toggle mobile menu clicked. Current state:', this.isMobileMenuOpen);
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    console.log('New state:', this.isMobileMenuOpen);
  }

  closeMobileMenu(): void {
    console.log('Closing mobile menu');
    this.isMobileMenuOpen = false;
  }

  onCategoryChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const category = target.value;
    
    if (category) {
      this.router.navigate(['/categorias', category]);
      target.value = '';
    }
  }
}

