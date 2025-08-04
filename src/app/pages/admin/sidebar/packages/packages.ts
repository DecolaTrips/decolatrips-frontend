import { Component } from '@angular/core';
import { PaginationComponent } from "../../components/pagination-component/pagination-component";
import { FilterComponent } from "../../components/filter-component/filter-component";
import { CommonModule } from '@angular/common';
import { TravelPackageForm } from '../../../travel-package-form/travel-package-form';
import { TravelPackageService } from '../../../../services/TravelPackageService';
import { TravelPackagePreview } from '../../../../models/travel-package-preview';
import { Router } from '@angular/router';

@Component({
  selector: 'app-packages',
  imports: [PaginationComponent, FilterComponent,CommonModule],
  templateUrl: './packages.html',
  styleUrl: './packages.css'
})
export class Packages {

  packages: TravelPackagePreview[] = []; 

 currentPage = 0;
 totalElements = 0;
 totalPages = 0;
 pageSize = 10;

  constructor(private travelPackageService: TravelPackageService, 
              private router: Router) {}

  ngOnInit(): void {
    this.loadPackages();
  }
  deletePackage(id: number): void {
  if (confirm('Deseja realmente excluir este pacote?')) {
    this.travelPackageService.deletePackage(id).subscribe({
      next: () => {
        alert('Pacote excluído com sucesso!');
        this.loadPackages(); // recarrega lista
      },
      error: (err) => console.error('Erro ao excluir pacote', err)
    });
  }
}
editPackage(id: number): void {
  this.router.navigate(['/admin/packages/create', id]); // ajuste se seu path for diferente
}

   loadPackages(page: number = 0) {
  this.travelPackageService.getAllTravelPackages(page, this.pageSize).subscribe({
    next: (data) => {
      this.packages = data.content;
      this.totalElements = data.totalElements;
      this.totalPages = data.totalPages;
      this.currentPage = page;
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

