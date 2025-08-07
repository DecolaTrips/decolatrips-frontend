import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ITraveler } from '../../models/traveler.interface';

@Component({
  selector: 'app-other-travelers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './other-travelers.component.html',
  styleUrl: './other-travelers.component.css'
})
export class OtherTravelersComponent {
  @Input() travelers: ITraveler[] = [];
  @Input() allowAddRemove: boolean = true; // New input to control add/remove functionality
  @Output() travelersChange = new EventEmitter<ITraveler[]>();

  // expandir formulario
  expandedTravelers: Set<number> = new Set();

  getTravelerLabel(traveler: ITraveler, index: number): string {
    if (traveler.type === 'child') {
      const childrenBefore = this.travelers.slice(0, index).filter(t => t.type === 'child').length;
      const childNumber = (childrenBefore + 1).toString().padStart(2, '0');
      return `Criança ${childNumber}`;
    } else {
      const adultsBefore = this.travelers.slice(0, index).filter(t => t.type !== 'child').length;
      const adultNumber = (adultsBefore + 2).toString().padStart(2, '0');
      return `Adulto ${adultNumber}`;
    }
  }

  addTraveler(): void {
    const newTraveler: ITraveler = {
      id: Date.now(),
      name: '',
      email: '',
      document: '',
      phone: '',
      type: 'adult' // default 
    };
    this.travelers.push(newTraveler);
    this.onTravelersChange();
  }

  removeTraveler(index: number): void {
    this.travelers.splice(index, 1);
    this.onTravelersChange();
  }

  toggleTravelerForm(travelerId: number): void {
    if (this.expandedTravelers.has(travelerId)) {
      this.expandedTravelers.delete(travelerId);
    } else {
      this.expandedTravelers.add(travelerId);
    }
  }

  isTravelerExpanded(travelerId: number): boolean {
    return this.expandedTravelers.has(travelerId);
  }

  updateTraveler(index: number, updatedTraveler: ITraveler): void {
    this.travelers[index] = { ...updatedTraveler };
    this.onTravelersChange();
  }

  onTravelersChange(): void {
    this.travelersChange.emit(this.travelers);
  }
}