import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-searchbar',
  imports: [FormsModule, CommonModule],
  templateUrl: './searchbar.html',
  styleUrl: './searchbar.css'
})
export class Searchbar {
  adults: number = 1;
  children: number = 0;
  travalers: number = 0;

  onSubmit() {
    // Validações
    if (this.adults < 1) {
      this.adults = 1;
    }
    if (this.children < 0) {
      this.children = 0;
    }

    this.travalers = this.adults + this.children;
    
    console.log('Busca:', {
      adults: this.adults,
      children: this.children
    });
  }
}