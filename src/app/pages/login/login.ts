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
  goToHome() {
    this.router.navigate(['/home']); // ou ['/'] se sua home for a rota raiz
  }

  constructor(
    private service: AuthService,
    private router: Router
  ) {}

  // redirecionar apos login
  //adicionar logica condicional para pagina de admin ou usuario
  changePageWithLogin() : void {
    this.router.navigate(['/home']);
  }


  onSubmitForm(formData: any) {
    this.isLoading = true;
    
    const loginData = {
      email: formData.email,
      password: formData.password
    };
    
    this.service.login(loginData).subscribe({
      next: (response ) => {
        this.isLoading = false;
        localStorage.setItem("jwt", response.token);
        localStorage.setItem("email", loginData.email);
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
