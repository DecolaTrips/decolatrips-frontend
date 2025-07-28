import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-package-highlight-card',
  standalone: true,
  imports: [],
  templateUrl: './package-highlight-card.html',
})
export class PackageHighlightCard {
  @Input() title: string = 'Templo de Luxor';
  @Input() description: string = 'Uma cidade vibrante onde o antigo e o moderno se encontram. Descubra museus impressionantes, mesquitas históricas e mercados cheios de vida.';
}
