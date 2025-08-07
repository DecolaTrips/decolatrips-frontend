import { Component } from '@angular/core';
import { PaginationComponent } from "../../components/pagination-component/pagination-component";
import { FilterComponent } from "../../components/filter-component/filter-component";
import { CommonModule } from '@angular/common';
import { TravelPackageService } from '../../../../services/TravelPackageService';
import { TravelPackagePreview } from '../../../../models/travel-package-preview';
import { Router, RouterModule } from '@angular/router';
import { TableComponent } from "../../../../components/table-component/table-component";

@Component({
  selector: 'app-packages',
  imports: [PaginationComponent, FilterComponent, CommonModule, TableComponent, RouterModule],
  templateUrl: './packages.html',
  styleUrl: './packages.css'
})
export class Packages {
  packages: TravelPackagePreview[] = [];

  columns: string[] = ['ID', 'Title', 'Place', 'Country', 'Price'];
  tableData: any[] = [];

  currentPage = 0;
  totalElements = 0;
  totalPages = 0;
  pageSize = 10;

  constructor(private travelPackageService: TravelPackageService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadPackages();
  }

  deletePackage(id: number): void {
    console.log('Excluindo pacote com ID:', id);

    if (confirm('Deseja realmente excluir este pacote?')) {
      this.travelPackageService.deletePackage(id).subscribe({
        next: () => {
          alert('Pacote excluído com sucesso!');
          this.loadPackages();
        },
        error: (err) => console.error('Erro ao excluir pacote', err)
      });
    }
  }

  editPackage(id: number): void {
    this.router.navigate(['/admin/packages/create', id]);
  }

  loadPackages(page: number = 0) {
    this.travelPackageService.getAllTravelPackages(page, this.pageSize).subscribe({
      next: (data) => {
        this.packages = data.content;
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
        this.currentPage = page;

        this.tableData = this.packages.map(pkg => ({
          id: pkg.id,
          title: pkg.title,
          place: pkg.place,
          country: pkg.country,
          price: pkg.valorBase,
        }));

      },
      error: (err) => {
        console.error('Erro ao carregar pacotes:', err);
      }
    });
  }

  onPageChange(page: number) {
    this.loadPackages(page);
  }

  goToCreate() {
    this.router.navigate(['/admin/packages/create']);
  }


}

