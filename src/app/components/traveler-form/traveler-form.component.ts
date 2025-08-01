import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ITraveler } from '../../models/traveler.interface';

@Component({
  selector: 'app-traveler-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './traveler-form.component.html',
  styleUrls: ['./traveler-form.component.css']
})
export class TravelerFormComponent {
  @Input() traveler: ITraveler = {
    id: 0,
    name: '',
    email: '',
    document: '',
    phone: ''
  };

  @Output() travelerChange = new EventEmitter<ITraveler>();

  onTravelerChange(): void {
    this.travelerChange.emit(this.traveler);
  }
}