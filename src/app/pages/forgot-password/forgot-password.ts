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
      alert(`Link de recuperação enviado para: ${email}`);
      console.log('Password reset email sent to:', email);
    }, 2000);
  }
}
