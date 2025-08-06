import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { FormInputComponent } from '../form-input/form-input.component';
import { FormButtonComponent } from '../form-button/form-button.component';

@Component({
  selector: 'app-reset-password-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormInputComponent, FormButtonComponent],
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.css']
})
export class ResetPasswordFormComponent {
  @Input() isLoading = false;
  @Output() submitForm = new EventEmitter<any>();

  resetPasswordForm: FormGroup;
  formSubmitted = false;

  constructor(private fb: FormBuilder) {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8), this.passwordStrengthValidator]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.resetPasswordForm.valid) {
      this.submitForm.emit(this.resetPasswordForm.value);
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.resetPasswordForm.controls).forEach(key => {
      const control = this.resetPasswordForm.get(key);
      control?.markAsTouched();
    });
  }

  private passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    
    if (!password || !confirmPassword) {
      return null;
    }
    
    return password.value === confirmPassword.value ? null : { 'passwordMismatch': true };
  }

  private passwordStrengthValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;
    if (!value) {
      return null;
    }

    const hasNumber = /[0-9]/.test(value);
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const isValidLength = value.length >= 8;

    const passwordValid = hasNumber && hasUpper && hasLower && isValidLength;

    if (!passwordValid) {
      return { 'passwordStrength': true };
    }

    return null;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.resetPasswordForm.get(fieldName);
    return !!(field && field.invalid && this.formSubmitted);
  }

  isPasswordMismatch(): boolean {
    return !!(this.resetPasswordForm.hasError('passwordMismatch') && this.formSubmitted);
  }

  getFieldErrors(fieldName: string): string[] {
    const field = this.resetPasswordForm.get(fieldName);
    const errors: string[] = [];
    
    if (field?.errors && this.formSubmitted) {
      if (field.errors['required']) {
        errors.push('Este campo é obrigatório');
      }
      if (field.errors['minlength']) {
        errors.push('A senha deve ter pelo menos 8 caracteres');
      }
      if (field.errors['passwordStrength']) {
        errors.push('A senha deve conter letras maiúsculas, minúsculas e números');
      }
    }
    
    return errors;
  }

  getPasswordMismatchError(): string {
    return 'As senhas não coincidem';
  }
}
