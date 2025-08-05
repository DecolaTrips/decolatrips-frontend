import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-special-request',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './special-request.component.html',
  styleUrls: ['./special-request.component.css']
})
export class SpecialRequestComponent {
  @Input() request: string = '';
  @Input() maxLength: number = 500;
  @Input() showCharacterCount: boolean = true;
  @Output() requestChange = new EventEmitter<string>();

  isExpanded: boolean = false;

  suggestions: string[] = [
    'Necessidades alimentares especiais',
    'Cadeira de rodas',
    'Assento próximo ao corredor',
    'Alergia alimentar',
    'Medicamentos refrigerados',
    'Assistência especial no embarque'
  ];

  toggleExpanded(): void {
    this.isExpanded = !this.isExpanded;
  }

  onRequestChange(): void {
    this.requestChange.emit(this.request);
  }

  applySuggestion(suggestion: string): void {
    this.request = suggestion;
    this.onRequestChange();
  }
}