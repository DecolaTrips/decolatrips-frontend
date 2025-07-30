import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { FormInputComponent } from '../form-input/form-input.component';
import { FormButtonComponent } from '../form-button/form-button.component';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormInputComponent, FormButtonComponent],
  templateUrl: './register-form.component.html'
})
export class RegisterFormComponent {
  @Input() isLoading = false;
  @Output() submitForm = new EventEmitter<any>();

  registerForm: FormGroup;
  formSubmitted = false;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      cpfPassport: ['', [Validators.required, Validators.minLength(11)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }
    return null;
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.registerForm.valid) {
      const { confirmPassword, ...formData } = this.registerForm.value;
      this.submitForm.emit(formData);
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      control?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.invalid && this.formSubmitted);
  }

  hasPasswordMismatch(): boolean {
    return !!(this.registerForm.errors?.['passwordMismatch'] && 
             this.formSubmitted);
  }

  getFieldErrors(fieldName: string): string[] {
    const field = this.registerForm.get(fieldName);
    const errors: string[] = [];
    
    if (field && field.errors && this.formSubmitted) {
      if (field.errors['required']) {
        const fieldNames: { [key: string]: string } = {
          'fullName': 'Nome completo',
          'email': 'Email',
          'cpfPassport': 'CPF/Passaporte',
          'password': 'Senha',
          'confirmPassword': 'Confirmação de senha'
        };
        errors.push(`${fieldNames[fieldName] || fieldName} é obrigatório`);
      }
      if (field.errors['email']) {
        errors.push('Email inválido');
      }
      if (field.errors['minlength']) {
        if (fieldName === 'password') {
          errors.push('Senha deve ter pelo menos 6 caracteres');
        } else if (fieldName === 'cpfPassport') {
          errors.push('CPF/Passaporte deve ter pelo menos 11 caracteres');
        } else if (fieldName === 'fullName') {
          errors.push('Nome deve ter pelo menos 2 caracteres');
        }
      }
    }
    
    // checar se a senha é igual
    if (fieldName === 'confirmPassword' && this.hasPasswordMismatch()) {
      errors.push('Senhas não coincidem');
    }
    
    return errors;
  }
}
