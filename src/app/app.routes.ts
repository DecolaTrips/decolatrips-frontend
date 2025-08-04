import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { PackageDetail } from './pages/package-detail/package-detail';
import { Categorias } from './pages/categorias/categorias';
import { DestinosInternacionais } from './pages/destinos-internacionais/destinos-internacionais';
import { DestinosNacionais } from './pages/destinos-nacionais/destinos-nacionais';
import { EmAlta } from './pages/em-alta/em-alta';

export const routes: Routes = [
  { path:"", redirectTo:"home", pathMatch: "full"},
  { path: "home", component: Home },
  { path: "package/:id", component: PackageDetail },
  { path: "categorias", component: Categorias },
  { path: "destinos/internacionais", component: DestinosInternacionais },
  { path: "destinos/nacionais", component: DestinosNacionais },
  { path: "emalta", component: EmAlta },
  { path: "404", component: Home } // Assuming you want to redirect to Home on 404
];
