import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormInputComponent } from '../form-input/form-input.component';
import { FormButtonComponent } from '../form-button/form-button.component';

@Component({
  selector: 'app-forgot-password-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormInputComponent, FormButtonComponent],
  templateUrl: './forgot-password-form.component.html',
  styleUrls: ['./forgot-password-form.component.css']
})
export class ForgotPasswordFormComponent {
  @Input() isLoading = false;
  @Output() submitForm = new EventEmitter<any>();

  forgotPasswordForm: FormGroup;
  formSubmitted = false;

  constructor(private fb: FormBuilder) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.forgotPasswordForm.valid) {
      this.submitForm.emit(this.forgotPasswordForm.value);
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.forgotPasswordForm.controls).forEach(key => {
      const control = this.forgotPasswordForm.get(key);
      control?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.forgotPasswordForm.get(fieldName);
    return !!(field && field.invalid && this.formSubmitted);
  }

  getFieldErrors(fieldName: string): string[] {
    const field = this.forgotPasswordForm.get(fieldName);
    const errors: string[] = [];
    
    if (field && field.errors && this.formSubmitted) {
      if (field.errors['required']) {
        errors.push('Email é obrigatório');
      }
      if (field.errors['email']) {
        errors.push('Email inválido');
      }
    }
    
    return errors;
  }
}
