import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { LoginFormComponent } from '../../components/login-form/login-form.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, LoginFormComponent],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  isLoading = false;

  constructor(
    private service: AuthService,
    private router: Router
  ) { }

  goToHome() {
    this.router.navigate(['/home']); // ou ['/'] se sua home for a rota raiz
  }

  // redirecionar apos login
  //adicionar logica condicional para pagina de admin ou usuario
  changePageWithLogin(): void {
  const roles = JSON.parse(localStorage.getItem("roles") || '[]');

  if (roles.includes("ROLE_ADMIN")) {
    this.router.navigate(['/admin/dashboard']);
  } else if (roles.includes("ROLE_CLIENTE")) {
    this.router.navigate(['/home']);
  } else {
    // Redireciona para uma página padrão, caso a role não seja reconhecida
    this.router.navigate(['/home']);
  }
}

  onSubmitForm(formData: any) {
    this.isLoading = true;

    const loginData = {
      email: formData.email,
      password: formData.password
    };

    this.service.login(loginData).subscribe({
      next: (response) => {
        this.isLoading = false;
        localStorage.setItem("jwt", response.token);
        localStorage.setItem("username", response.username);
        localStorage.setItem("userId", response.userId);
        localStorage.setItem("email", response.email);
        localStorage.setItem("roles", JSON.stringify(response.roles));

        this.changePageWithLogin();
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Login failed:', error);
      }
    });
  }

  onForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
}
