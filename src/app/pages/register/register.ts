import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegisterUser } from '../../models/user.model';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, RegisterFormComponent],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  isLoading = false;

  constructor(
    private authService: AuthService
  ) {}

  onSubmitForm(formData: any) {
    this.isLoading = true;
    const registerUser: RegisterUser = formData;
    
    this.authService.register(registerUser).subscribe({
      next: (success) => {
        this.isLoading = false;
        if (success) {
          console.log('Registration successful');
          alert('Conta criada com sucesso! Faça login para continuar.');
          // Optionally redirect to login page
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Registration failed:', error);
        alert('Erro ao criar conta. Tente novamente.');
      }
    });
  }
}
