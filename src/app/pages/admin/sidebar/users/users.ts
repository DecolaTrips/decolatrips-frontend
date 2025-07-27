import { Component } from '@angular/core';
import { PaginationComponent } from "../../components/pagination-component/pagination-component";

@Component({
  selector: 'app-users',
  imports: [PaginationComponent],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users {

}
