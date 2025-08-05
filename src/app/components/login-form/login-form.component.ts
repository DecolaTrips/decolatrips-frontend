import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormInputComponent } from '../form-input/form-input.component';
import { FormButtonComponent } from '../form-button/form-button.component';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormInputComponent, FormButtonComponent],
  templateUrl: '../login-form/login-form.component.html'
})
export class LoginFormComponent {
  @Input() isLoading = false;
  @Output() submitForm = new EventEmitter<any>();
  @Output() forgotPassword = new EventEmitter<void>();

  loginForm: FormGroup;
  formSubmitted = false;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    this.formSubmitted = true;
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
    return !!(field && field.invalid && this.formSubmitted);
  }

  getFieldErrors(fieldName: string): string[] {
    const field = this.loginForm.get(fieldName);
    const errors: string[] = [];
    
    if (field && field.errors && this.formSubmitted) {
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
