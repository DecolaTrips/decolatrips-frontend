import { Component, OnInit } from '@angular/core';
import { PaginationComponent } from "../../components/pagination-component/pagination-component";
import { FilterComponent } from "../../components/filter-component/filter-component";
import { User } from '../../../../classes/user';
import { UserService } from '../../../../services/user-service';
import { UserResponse } from '../../../../interfaces/user-response';
import { CommonModule, DatePipe } from '@angular/common';
import { TableComponent } from "../../../../components/table-component/table-component";

@Component({
  selector: 'app-users',
  imports: [PaginationComponent, FilterComponent, CommonModule, TableComponent],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users implements OnInit {
  searchTerm: string = '';
  filteredUsers: User[] = [];
  columns: string[] = ['ID', 'Name', 'Email', 'Registration Date'];
  tableData: any[] = [];

  constructor(private service: UserService) { }

  ngOnInit(): void {
    this.loadUsers(0, 10);
  }

  loadUsers(pageNo: number, pageSize: number): void {
  this.service.getUsersApi(pageNo, pageSize).subscribe({
    next: (resposta: UserResponse) => {
      this.users = resposta.content;
      this.totalElements = resposta.totalElements;
      this.currentPage = resposta.pageNo;
      this.totalPages = resposta.totalPages;

      this.tableData = this.users.map(user => ({
        id: user.idUser,
        name: user.username,
        email: user.email,
        registrationDate: user.creationDate
      }));

      this.filteredUsers = [...this.tableData];
    },
    error: (err) => {
      console.error('Erro ao carregar usuários:', err);
    }
  });
}

  onPageChange(page: number) {
    this.loadUsers(page, 10);
  }

  filterUsers(term: string) {
    term = term.toLowerCase();

    this.filteredUsers = this.tableData.filter(user =>
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
  }

  users: User[] = [];
  totalElements: number = 0;
  currentPage: number = 0;
  totalPages: number = 0;
}
