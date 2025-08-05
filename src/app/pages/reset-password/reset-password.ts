import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ResetPasswordFormComponent } from '../../components/reset-password-form/reset-password-form.component';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, RouterModule, ResetPasswordFormComponent],
  templateUrl: './reset-password.html',
  styleUrls: ['./reset-password.css']
})
export class ResetPasswordComponent implements OnInit {
  isLoading = false;
  token: string | null = null;
  tokenValid = false;
  errorMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // pegar o token da URL
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      if (this.token) {
        this.validateToken();
      } else {
        this.errorMessage = 'Token de recuperação inválido ou não fornecido.';
      }
    });
  }

  validateToken() {
    if (!this.token) return;
    
    this.isLoading = true;
    
    // this.authService.validateResetToken(this.token)
    //   .subscribe({
    //     next: (response) => {
    //       this.tokenValid = response.valid;
    //       this.isLoading = false;
    //       if (!response.valid) {
    //         this.errorMessage = 'Token de recuperação expirado ou inválido.';
    //       }
    //     },
    //     error: (error) => {
    //       this.isLoading = false;
    //       this.errorMessage = 'Erro ao validar token. Tente novamente.';
    //       console.error('Token validation error:', error);
    //     }
    //   });
    
    // pra teste - tirar quando colocar a api
    setTimeout(() => {
      this.tokenValid = true;
      this.isLoading = false;
    }, 1000);
  }

  onSubmitForm(formData: any) {
    if (!this.token) {
      this.errorMessage = 'Token de recuperação inválido.';
      return;
    }

    this.isLoading = true;
    const { password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      this.errorMessage = 'As senhas não coincidem.';
      this.isLoading = false;
      return;
    }

    this.authService.resetPassword(this.token, password, confirmPassword)
      .subscribe({
        next: () => {
          this.isLoading = false;
          console.log('Senha redefinida com sucesso.');
          this.router.navigate(['/login']);
        },
        error: err => {
          this.isLoading = false;
          this.errorMessage = 'Erro ao redefinir senha. Tente novamente.';
          console.error('Reset password error:', err);
        }
      });
  }

  onBackToLogin() {
    this.router.navigate(['/login']);
  }
}
