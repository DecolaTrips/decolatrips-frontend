import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-package-card',
  imports: [RouterLink],
  templateUrl: './package-card.html',
  styleUrl: './package-card.css'
})
export class PackageCard {
  @Input()
  travelPackage: { id: string } = { id: '1' };

  @Input()
  photoCover: string = "";

  @Input()
  title: string = "";

  @Input()
  price: string = "";

  @Input()
  days: string = "2";

  @Input()
  nights: string = "";

  ngOnInit() {
    if (!this.nights || this.nights === "") {
      this.nights = (Number(this.days) - 1).toString();
    }
  }

}
