import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-searchbar',
  imports: [FormsModule, CommonModule],
  templateUrl: './searchbar.html',
  styleUrl: './searchbar.css'
})
export class Searchbar {
  adults: number = 1;
  children: number = 0;
  destination: string = '';

  constructor(
    private router: Router,
    private searchService: SearchService
  ) {}

  onSubmit() {
    // Validações
    if (this.adults < 1) {
      this.adults = 1;
    }
    if (this.children < 0) {
      this.children = 0;
    }

    const totalTravelers = this.adults + this.children;
    
    const searchData = {
      destination: this.destination,
      adults: this.adults,
      children: this.children,
      totalTravelers: totalTravelers
    };

    this.searchService.updateSearchData(searchData);
    
    console.log('Busca:', searchData);

    // pra navegar pro checkout com os componentes da busca
    this.router.navigate(['/checkout'], {
      queryParams: {
        adults: this.adults,
        children: this.children,
        destination: this.destination || 'Destino selecionado'
      }
    });
  }
}