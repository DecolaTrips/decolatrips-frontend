import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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
    private authService: AuthService
  ) {}

  onSubmitForm(formData: any) {
    this.isLoading = true;
    const user: User = formData;
    
    this.authService.login(user).subscribe({
      next: (success) => {
        this.isLoading = false;
        if (success) {
          console.log('Login successful');
          // redirecionar para dashboard ou pag principal
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Login failed:', error);
      }
    });
  }

  onForgotPassword() {
    alert('Funcionalidade de recuperação de senha será implementada em breve!');
  }
}
