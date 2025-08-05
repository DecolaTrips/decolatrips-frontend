import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
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
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmitForm(formData: any) {
    this.isLoading = true;
    console.log('Dados do formulário:', formData);
    const registerUser: RegisterUser = formData;
    console.log('Dados formatados:', registerUser);
    
    this.authService.register(registerUser).subscribe({
      next: (response) => {
        this.isLoading = false;
        
        console.log('Registration successful', response);
        alert('Conta criada com sucesso! Faça login para continuar.');
        this.router.navigate(['/home']);
        
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Registration failed:', error);
        alert('Erro ao criar conta. Tente novamente.');
      }
    });
  }
}
