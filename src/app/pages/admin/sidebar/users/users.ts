import { Component } from '@angular/core';
import { PaginationComponent } from "../../components/pagination-component/pagination-component";
import { FilterComponent } from "../../components/filter-component/filter-component";

@Component({
  selector: 'app-users',
  imports: [PaginationComponent, FilterComponent],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users {

}
