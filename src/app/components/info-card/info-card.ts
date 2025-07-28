import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-card',
  standalone: true,
  imports: [],
  templateUrl: './info-card.html',
})
export class InfoCard {
  @Input() title: string = 'Título do Card';
}
