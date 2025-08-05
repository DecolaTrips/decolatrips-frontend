import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-card.html',
})
export class InfoCard {
  active: boolean = false;

  @Input() title: string = 'Título do Card';
  @Input() description: string = 'Descrição do Card';

  toggle(): void {
    this.active = !this.active;
  }
}
