import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { PackageDetail } from './pages/package-detail/package-detail';
import { Categorias } from './pages/categorias/categorias';
import { Admin } from './pages/admin/admin/admin';
import { Dashboard } from './pages/admin/sidebar/dashboard/dashboard';
import { Packages } from './pages/admin/sidebar/packages/packages';
import { Finance } from './pages/admin/sidebar/finance/finance';
import { Users } from './pages/admin/sidebar/users/users';
import { Reviews } from './pages/admin/sidebar/reviews/reviews';
import { DestinosInternacionais } from './pages/destinos-internacionais/destinos-internacionais';
import { DestinosNacionais } from './pages/destinos-nacionais/destinos-nacionais';
import { EmAlta } from './pages/em-alta/em-alta';
import { CheckoutComponent } from './pages/checkout-page/checkout.component';
import { DadosPessoaisComponent } from './pages/dados-pessoais/dados-pessoais.component';
import { MyPackagesComponent } from './pages/my-packages-page/my-packages.component';
import { Faqs } from './pages/faqs/faqs';
import { Sobrenos } from './pages/sobrenos/sobrenos';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { authGuard } from './guards/auth-guard';
import { Terms } from './pages/terms/terms';
import { FraudPrevention } from './pages/fraud-prevention/fraud-prevention';
import { PrivacyPolicy } from './pages/privacy-policy/privacy-policy';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password';
import { ResetPasswordComponent } from './pages/reset-password/reset-password';

export const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: Home },
  { path: "package/:id", component: PackageDetail },
  { path: "categorias", component: Categorias },
  { path: "checkout", component: CheckoutComponent },
  { path: "dados-pessoais", component: DadosPessoaisComponent },
  { path: "destinos/internacionais", component: DestinosInternacionais },
  { path: "destinos/nacionais", component: DestinosNacionais },
  { path: "emalta", component: EmAlta },
  { path: "faqs", component: Faqs },
  { path: "sobrenos", component: Sobrenos },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "forgot-password", component: ForgotPasswordComponent },
  { path: "reset-password", component: ResetPasswordComponent },
  { path: "meus-pacotes", component: MyPackagesComponent },
  { path: "terms", component: Terms },
  { path: "fraud-prevention", component: FraudPrevention },
  { path: "privacy-policy", component: PrivacyPolicy },
  {
    path: "admin",
    component: Admin,
    children: [
      { path: "dashboard", component: Dashboard },
      { path: "packages", component: Packages },
      {
        path: "packages/create",
        loadComponent: () =>
          import('./pages/travel-package-form/travel-package-form').then(
            (m) => m.TravelPackageForm
          ),
      },
      {
        path: "packages/create/:id",
        loadComponent: () =>
          import('./pages/travel-package-form/travel-package-form').then(
            (m) => m.TravelPackageForm
          ),
      },
      { path: "finance", component: Finance },
      { path: "users", component: Users },
      { path: "reviews", component: Reviews },
      { path: "", redirectTo: "/admin/packages", pathMatch: "full" },
    ],
  },
  { path: "404", component: Home }, // Redireciona para Home no 404 (ajuste conforme necessário)
  { path: "**", redirectTo: "404" }, // Wildcard para rotas não encontradas


];
