import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InfoCard } from '../../components/info-card/info-card';
import { PackageHighlightCard } from '../../components/package-highlight-card/package-highlight-card';

@Component({
  selector: 'app-package-detail',
  imports: [CommonModule, InfoCard, PackageHighlightCard],
  templateUrl: './package-detail.html',
})
export class PackageDetail {

}
