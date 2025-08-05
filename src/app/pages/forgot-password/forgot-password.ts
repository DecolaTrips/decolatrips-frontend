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
  ) {}

  onSubmitForm(formData: any) {
    this.isLoading = true;
    const email = formData.email;
    
    // por enquanto simulacao da api 
    setTimeout(() => {
      this.isLoading = false;
      // For demonstration purposes, show a more detailed message with the reset link
      const resetLink = `${window.location.origin}/reset-password?token=sample-token-123`;
      alert(`Link de recuperação enviado para: ${email}\n\nPara fins de demonstração, você pode acessar diretamente:\n${resetLink}`);
      console.log('Password reset email sent to:', email);
      console.log('Reset link:', resetLink);
    }, 2000);
  }
}
