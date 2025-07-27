import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Admin } from './pages/admin/admin/admin';
import { Dashboard } from './pages/admin/sidebar/dashboard/dashboard';
import { Packages } from './pages/admin/sidebar/packages/packages';
import { Finance } from './pages/admin/sidebar/finance/finance';
import { Users } from './pages/admin/sidebar/users/users';
import { Reviews } from './pages/admin/sidebar/reviews/reviews';



export const routes: Routes = [
    { path:"", redirectTo:"home", pathMatch: "full"},
    { path: "home", component: Home },
    {path: "admin",
    component: Admin, // Componente pai
    children: [
      { path: "dashboard", component: Dashboard },
      { path: "packages", component: Packages },
      { path: "finance", component: Finance },
      { path: "users", component: Users },
      { path: "reviews", component: Reviews },
    ],
  },
];
