import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { DestinosInternacionais } from './pages/destinos-internacionais/destinos-internacionais';
import { DestinosNacionais } from './pages/destinos-nacionais/destinos-nacionais';
import { EmAlta } from './pages/em-alta/em-alta';
import { CheckoutComponent } from './pages/checkout-page/checkout.component';
import { Categorias } from './pages/categorias/categorias';
import { Faqs } from './pages/faqs/faqs';
import { Sobrenos } from './pages/sobrenos/sobrenos';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password';
import { ResetPasswordComponent } from './pages/reset-password/reset-password';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
    },
    {
        path: "home",
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
        path: "categorias",
        component: Categorias
    },
    {
        path: "checkout",
        component: CheckoutComponent
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
    },
    {
        path: "forgot-password",
        component: ForgotPasswordComponent
    },
    {
        path: "reset-password",
        component: ResetPasswordComponent
    }
];
