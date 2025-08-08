import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar-t2/navbar.component';
import { PackageCardComponent } from '../../components/package-card/package-card.component';
import { Footer } from '../../components/footer/footer';
import { BookedPackage } from '../../models/package.interface';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-my-packages',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, PackageCardComponent, Footer],
  templateUrl: './my-packages.component.html',
  styles: [`
    .page-container {
      min-height: 100vh;
      background-color: #f9fafb;
    }
    
    .content-section {
      padding-top: 2rem;
      padding-bottom: 4rem;
    }
  `]
})
export class MyPackagesComponent implements OnInit {
  userPackages: BookedPackage[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private reservationPackage: ReservationService) { }

  ngOnInit(): void {
    this.loadUserPackages();
  }

  loadUserPackages(): void {
    this.isLoading = true;
    this.error = null;

    let userId = localStorage.getItem('userId');

    this.reservationPackage.getReservationByUserId(Number(userId)).subscribe({
      next: (packages) => {
        this.userPackages = packages;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading user packages:', error);
        this.error = 'Erro ao carregar seus pacotes. Tente novamente.';
        this.isLoading = false;
      }
    });
  }

  onViewPackageDetails(packageId: number): void {
    console.log('Visualizar detalhes do pacote:', packageId);
  }
}