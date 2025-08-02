import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-package-card',
  imports: [],
  templateUrl: './package-card.html',
  styleUrl: './package-card.css'
})
export class PackageCard {

  @Input()
  photoCover: string = "";

  @Input()
  title: string = "";

  @Input()
  price: string = "";

  @Input()
  days: string = "2";

  @Input()
  nights: string = (Number(this.days) - 1).toString();

  constructor() {  }

}
