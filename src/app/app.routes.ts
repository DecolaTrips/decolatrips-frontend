import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Categorias } from './pages/categorias/categorias';
import { DestinosInternacionais } from './pages/destinos-internacionais/destinos-internacionais';
import { DestinosNacionais } from './pages/destinos-nacionais/destinos-nacionais';
import { EmAlta } from './pages/em-alta/em-alta';
import { CheckoutComponent } from './pages/checkout-page/checkout.component';
import { DadosPessoaisComponent } from './pages/dados-pessoais/dados-pessoais.component';
import { MyPackagesComponent } from './pages/my-packages-page/my-packages.component';

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
        path: "dados-pessoais",
        component: DadosPessoaisComponent
    },
    {
        path: "meus-pacotes",
        component: MyPackagesComponent
    }
];
