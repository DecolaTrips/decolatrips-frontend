import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { DestinosInternacionais } from './pages/destinos-internacionais/destinos-internacionais';
import { DestinosNacionais } from './pages/destinos-nacionais/destinos-nacionais';
import { EmAlta } from './pages/em-alta/em-alta';
import { Faqs } from './pages/faqs/faqs';
import { Sobrenos } from './pages/sobrenos/sobrenos';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
    },
    {
        path: "home",
        //component: Home, canActivate: [authGuard]
        component: Home
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
