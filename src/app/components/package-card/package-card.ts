import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../../services/search.service';

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
  days: string = "";
  
  @Input()
  nights: string = "";

  constructor(
    private router: Router,
    private searchService: SearchService
  ) {}

  onViewPackage() {
    const currentSearch = this.searchService.getCurrentSearchData();
    
    // Navigate to checkout with current search parameters and package info
    this.router.navigate(['/checkout'], {
      queryParams: {
        adults: currentSearch.adults,
        children: currentSearch.children,
        destination: this.title,
        packageTitle: this.title,
        packagePrice: this.price,
        packageDays: this.days,
        packageNights: this.nights
      }
    });
  }
}
