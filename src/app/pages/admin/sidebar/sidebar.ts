import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive] ,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  sidebarItems = [
    { name: 'Dashboard', route: '/admin/dashboard', icon: 'dashboard' },
    { name: 'Pacotes', route: '/admin/packages', icon: 'local_airport' },
    { name: 'Usuários', route: '/admin/users', icon: 'people' },
    { name: 'Reviews', route: '/admin/reviews', icon: 'forum' },
  ];
}
