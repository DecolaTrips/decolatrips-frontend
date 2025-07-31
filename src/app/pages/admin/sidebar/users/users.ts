import { Component, OnInit } from '@angular/core';
import { PaginationComponent } from "../../components/pagination-component/pagination-component";
import { FilterComponent } from "../../components/filter-component/filter-component";
import { User } from '../../../../classes/user';
import { UserService } from '../../../../services/user-service';
import { UserResponse } from '../../../../interfaces/user-response';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [PaginationComponent, FilterComponent, DatePipe, CommonModule],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users implements OnInit {

  constructor(private service: UserService) { }

  ngOnInit(): void {
    this.loadUsers(0, 10);
  }

  loadUsers(pageNo: number, pageSize: number) {
    this.service.getUsersApi(pageNo, pageSize).subscribe((resposta: UserResponse) => {
      this.users = resposta.content;
      this.totalElements = resposta.totalElements;
      this.currentPage = resposta.pageNo;
      this.totalPages = resposta.totalPages;
    });
  }

  onPageChange(page: number) {
    this.loadUsers(page, 10);
  }

  users: User[] = [];
  totalElements: number = 0;
  currentPage: number = 0;
  totalPages: number = 0;
}