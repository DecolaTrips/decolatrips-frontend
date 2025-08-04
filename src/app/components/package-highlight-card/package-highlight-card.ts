import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-package-highlight-card',
  standalone: true,
  imports: [],
  templateUrl: './package-highlight-card.html',
})
export class PackageHighlightCard {
  @Input() imageUrl: string = '';
  @Input() description: string = '';
}
