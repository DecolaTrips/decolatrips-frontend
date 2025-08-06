import { Component } from '@angular/core';
import { TableComponent } from '../../../../components/table-component/table-component';
import { FilterComponent } from '../../components/filter-component/filter-component';
import { TravelPackagePreview } from '../../../../models/travel-package-preview';
import { TravelPackageService } from '../../../../services/TravelPackageService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reviews',
  imports: [TableComponent, FilterComponent],
  templateUrl: './reviews.html',
  styleUrl: './reviews.css'
})
export class Reviews {
  packages: TravelPackagePreview[] = [];

  columns: string[] = ['ID', 'Title'];
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
}
