import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { DestinosInternacionais } from './pages/destinos-internacionais/destinos-internacionais';
import { DestinosNacionais } from './pages/destinos-nacionais/destinos-nacionais';
import { EmAlta } from './pages/em-alta/em-alta';
import { Faqs } from './pages/faqs/faqs';
import { Sobrenos } from './pages/sobrenos/sobrenos';
import { Terms } from './pages/terms/terms';
import { FraudPrevention } from './pages/fraud-prevention/fraud-prevention';
import { PrivacyPolicy } from './pages/privacy-policy/privacy-policy';

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
        path: "faqs",
        component: Faqs
    },
    {
        path: "sobrenos",
        component: Sobrenos
    },
    {
        path: "terms",
        component: Terms
    },
    {
        path: "fraud-prevention",
        component: FraudPrevention
    },
    {
        path: "privacy-policy",
        component: PrivacyPolicy
    }
];
