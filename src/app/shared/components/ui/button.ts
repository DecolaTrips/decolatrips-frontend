import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="type"
      [disabled]="disabled || loading"
      [class]="buttonClasses"
      (click)="onClick()"
    >
      <svg 
        *ngIf="loading" 
        class="animate-spin -ml-1 mr-2 h-4 w-4" 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
      >
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      
      <ng-content></ng-content>
    </button>
  `
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() fullWidth = false;

  @Output() click = new EventEmitter<void>();

  get buttonClasses(): string {
    const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors duration-200';
    
    const variantClasses = {
      primary: 'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600 disabled:bg-gray-300',
      secondary: 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:bg-gray-100',
      danger: 'bg-red-600 text-white hover:bg-red-500 focus-visible:outline-red-600 disabled:bg-gray-300',
      success: 'bg-green-600 text-white hover:bg-green-500 focus-visible:outline-green-600 disabled:bg-gray-300'
    };

    const sizeClasses = {
      sm: 'px-2.5 py-1.5 text-xs',
      md: 'px-3 py-2 text-sm',
      lg: 'px-3.5 py-2.5 text-sm'
    };

    const widthClass = this.fullWidth ? 'w-full' : '';
    const disabledClass = (this.disabled || this.loading) ? 'cursor-not-allowed' : '';

    return [
      baseClasses,
      variantClasses[this.variant],
      sizeClasses[this.size],
      widthClass,
      disabledClass
    ].filter(Boolean).join(' ');
  }

  onClick(): void {
    if (!this.disabled && !this.loading) {
      this.click.emit();
    }
  }
}