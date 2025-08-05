import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ForgotPasswordFormComponent } from '../../components/forgot-password-form/forgot-password-form.component';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterModule, ForgotPasswordFormComponent],
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.css']
})
export class ForgotPasswordComponent {
  isLoading = false;

  constructor(
    private authService: AuthService
  ) { }

  onSubmitForm(formData: any) {
    this.isLoading = true;
    const email = formData.email;

    this.authService.forgotPassword(email)
      .subscribe({
        next: () => {
          this.isLoading = false;
          console.log('Email de redefinição enviado com sucesso.');
        },
        error: err => {
          this.isLoading = false;
          console.error('Erro ao enviar email de redefinição:', err);
        }
      });
  }
}
