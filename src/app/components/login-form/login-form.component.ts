import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormInputComponent } from '../form-input/form-input.component';
import { FormButtonComponent } from '../form-button/form-button.component';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormInputComponent, FormButtonComponent],
  template: `
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6">
      <!-- email -->
      <div>
        <app-form-input
          inputId="email"
          type="email"
          placeholder="Email"
          [formControlName]="'email'"
          [hasError]="isFieldInvalid('email')"
          [errorMessages]="getFieldErrors('email')">
        </app-form-input>
      </div>

      <!-- senha -->
      <div>
        <app-form-input
          inputId="password"
          type="password"
          placeholder="Senha"
          [formControlName]="'password'"
          [hasError]="isFieldInvalid('password')"
          [errorMessages]="getFieldErrors('password')">
        </app-form-input>
      </div>

      <!-- link esqueceu senha -->
      <div class="text-right">
        <button
          type="button"
          (click)="onForgotPassword()"
          class="text-sm text-blue-600 hover:text-blue-500 underline"
        >
          Esqueceu sua senha?
        </button>
      </div>

      <!-- botão de login -->
      <app-form-button
        text="Entrar"
        loadingText="Entrando..."
        [isLoading]="isLoading">
      </app-form-button>
    </form>
  `
})
export class LoginFormComponent {
  @Input() isLoading = false;
  @Output() submitForm = new EventEmitter<any>();
  @Output() forgotPassword = new EventEmitter<void>();

  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.submitForm.emit(this.loginForm.value);
    } else {
      this.markFormGroupTouched();
    }
  }

  onForgotPassword() {
    this.forgotPassword.emit();
  }

  private markFormGroupTouched() {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getFieldErrors(fieldName: string): string[] {
    const field = this.loginForm.get(fieldName);
    const errors: string[] = [];
    
    if (field && field.errors && field.touched) {
      if (field.errors['required']) {
        errors.push(`${fieldName === 'email' ? 'Email' : 'Senha'} é obrigatório`);
      }
      if (field.errors['email']) {
        errors.push('Email inválido');
      }
      if (field.errors['minlength']) {
        errors.push('Senha deve ter pelo menos 6 caracteres');
      }
    }
    
    return errors;
  }
}
