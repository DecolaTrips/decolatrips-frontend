import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { FormInputComponent } from '../form-input/form-input.component';
import { FormButtonComponent } from '../form-button/form-button.component';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormInputComponent, FormButtonComponent],
  template: `
    <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="space-y-4">
      <!-- nome completo -->
      <div>
        <app-form-input
          inputId="fullName"
          type="text"
          placeholder="Nome Completo"
          [formControlName]="'fullName'"
          [hasError]="isFieldInvalid('fullName')"
          [errorMessages]="getFieldErrors('fullName')">
        </app-form-input>
      </div>

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

      <!-- CPF/passaporte -->
      <div>
        <app-form-input
          inputId="cpfPassport"
          type="text"
          placeholder="CPF/Passaporte"
          [formControlName]="'cpfPassport'"
          [hasError]="isFieldInvalid('cpfPassport')"
          [errorMessages]="getFieldErrors('cpfPassport')">
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

      <!-- confirmar senha -->
      <div>
        <app-form-input
          inputId="confirmPassword"
          type="password"
          placeholder="Confirme sua senha"
          [formControlName]="'confirmPassword'"
          [hasError]="isFieldInvalid('confirmPassword') || hasPasswordMismatch()"
          [errorMessages]="getFieldErrors('confirmPassword')">
        </app-form-input>
      </div>

      <!-- botão de registro -->
      <app-form-button
        text="Criar conta"
        loadingText="Criando conta..."
        [isLoading]="isLoading">
      </app-form-button>
    </form>
  `
})
export class RegisterFormComponent {
  @Input() isLoading = false;
  @Output() submitForm = new EventEmitter<any>();

  registerForm: FormGroup;

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
    return !!(field && field.invalid && field.touched);
  }

  hasPasswordMismatch(): boolean {
    return !!(this.registerForm.errors?.['passwordMismatch'] && 
             this.registerForm.get('confirmPassword')?.touched);
  }

  getFieldErrors(fieldName: string): string[] {
    const field = this.registerForm.get(fieldName);
    const errors: string[] = [];
    
    if (field && field.errors && field.touched) {
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
