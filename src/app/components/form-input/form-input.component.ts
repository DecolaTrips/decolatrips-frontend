import { Component, Input, forwardRef, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-input',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative">
      <input
        [id]="inputId"
        [type]="currentType()"
        [placeholder]="placeholder"
        [value]="value"
        (input)="onInput($event)"
        (blur)="onTouched()"
        class="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg text-gray-700 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all duration-200"
        [class.pr-12]="type === 'password'"
        [class.ring-2]="hasError"
        [class.ring-red-500]="hasError"
        [disabled]="disabled"
      />
      
      <!-- visibilidade da senha -->
      <button
        *ngIf="type === 'password'"
        type="button"
        (click)="togglePasswordVisibility()"
        class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
      >
        <svg *ngIf="!showPassword()" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
        </svg>
        <svg *ngIf="showPassword()" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
        </svg>
      </button>
      
      <!-- mensagem de erro -->
      <div *ngIf="hasError && errorMessages.length > 0" class="mt-1 text-sm text-red-600">
        <span *ngFor="let error of errorMessages">{{ error }}</span>
      </div>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInputComponent),
      multi: true
    }
  ]
})
export class FormInputComponent implements ControlValueAccessor {
  @Input() inputId = '';
  @Input() type: 'text' | 'email' | 'password' = 'text';
  @Input() placeholder = '';
  @Input() hasError = false;
  @Input() errorMessages: string[] = [];
  @Input() disabled = false;

  showPassword = signal(false);
  value = '';
  
  onChange = (value: string) => {};
  onTouched = () => {};

  currentType() {
    if (this.type === 'password') {
      return this.showPassword() ? 'text' : 'password';
    }
    return this.type;
  }

  togglePasswordVisibility() {
    this.showPassword.update(show => !show);
  }

  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
  }

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
