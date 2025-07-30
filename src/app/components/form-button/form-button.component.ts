import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-button.component.html'
})
export class FormButtonComponent {
  @Input() type: 'button' | 'submit' = 'submit';
  @Input() text = 'Enviar';
  @Input() loadingText = 'Enviando...';
  @Input() disabled = false;
  @Input() isLoading = false;
  
  @Output() buttonClick = new EventEmitter<void>();

  onClick() {
    if (this.type === 'button') {
      this.buttonClick.emit();
    }
  }
}
