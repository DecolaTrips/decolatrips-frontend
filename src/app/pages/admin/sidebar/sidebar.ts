import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive] ,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  isLogged = false;
  username: string | null = null;
  userRoles: string[] | null = null;

  constructor(private router: Router) {
    
  }

  sidebarItems = [
    { name: 'Dashboard', route: '/admin/dashboard', icon: 'dashboard' },
    { name: 'Pacotes', route: '/admin/packages', icon: 'local_airport' },
    { name: 'Usuários', route: '/admin/users', icon: 'people' },
    { name: 'Reviews', route: '/admin/reviews', icon: 'forum' },
  ];

  ngOnInit(): void {
    this.updateAuthState();
  }

  private updateAuthState(): void {
    this.username = localStorage.getItem("username");
    this.userRoles = JSON.parse(localStorage.getItem("roles") || '[]');
    this.isLogged = !!localStorage.getItem('jwt');
  }

  logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('roles');

    this.router.navigate(['/']);
  }
}
