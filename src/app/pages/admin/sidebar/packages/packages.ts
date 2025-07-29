import { Component } from '@angular/core';
import { PaginationComponent } from "../../components/pagination-component/pagination-component";
import { FilterComponent } from "../../components/filter-component/filter-component";

@Component({
  selector: 'app-packages',
  imports: [PaginationComponent, FilterComponent],
  templateUrl: './packages.html',
  styleUrl: './packages.css'
})
export class Packages {

}
