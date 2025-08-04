import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Admin } from './pages/admin/admin/admin';
import { Dashboard } from './pages/admin/sidebar/dashboard/dashboard';
import { Packages } from './pages/admin/sidebar/packages/packages';
import { Finance } from './pages/admin/sidebar/finance/finance';
import { Users } from './pages/admin/sidebar/users/users';
import { Reviews } from './pages/admin/sidebar/reviews/reviews';
import { TravelPackageForm } from './pages/travel-package-form/travel-package-form';
import { DestinosInternacionais } from './pages/destinos-internacionais/destinos-internacionais';
import { DestinosNacionais } from './pages/destinos-nacionais/destinos-nacionais';
import { EmAlta } from './pages/em-alta/em-alta';
import { Faqs } from './pages/faqs/faqs';
import { Sobrenos } from './pages/sobrenos/sobrenos';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';

export const routes: Routes = [
    { path:"", redirectTo:"home", pathMatch: "full"},
    { path: "home", component: Home },
    { path: "admin",component: Admin, 
      children: [
        { path: "dashboard", component: Dashboard },
        { path: "packages", component: Packages },
        { path: "packages/create", loadComponent: () => import('./pages/travel-package-form/travel-package-form').then(m => m.TravelPackageForm) },
        { 
          path: "packages/create/:id", 
          loadComponent: () => import('./pages/travel-package-form/travel-package-form').then(m => m.TravelPackageForm) 
        },
        { path: "finance", component: Finance },
        { path: "users", component: Users },
        { path: "reviews", component: Reviews },
        { path: '', redirectTo: '/packages', pathMatch: 'full' }
      ]   
    },
    {
        path: "destinos/internacionais",
        component: DestinosInternacionais
    },
    {
        path: "destinos/nacionais",
        component: DestinosNacionais
    },
    {
        path: "emalta",
        component: EmAlta
    },
    {
        path: "faqs",
        component: Faqs
    },
    {
        path: "sobrenos",
        component: Sobrenos
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "register",
        component: RegisterComponent
    }
];
