import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar-t2/navbar.component';
import { PackageCardComponent } from '../../components/package-card/package-card.component';
import { Footer } from '../../components/footer/footer';
import { BookedPackage } from '../../models/package.interface';
import { UserPackagesService } from '../../services/user-packages.service';

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

  constructor(private userPackagesService: UserPackagesService) { }

  ngOnInit(): void {
    this.loadUserPackages();
  }

  loadUserPackages(): void {
    this.isLoading = true;
    this.error = null;
    
    this.userPackagesService.getUserPackages().subscribe({
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
  
  onContactSupport(packageId: number): void {
    console.log('Contatar suporte para pacote:', packageId);
    
    this.userPackagesService.contactSupport(packageId).subscribe({
      next: (response) => {
        if (response.success) {
          alert(`Ticket de suporte criado: ${response.ticketId}\n${response.message}`);
        } else {
          alert('Erro ao contatar suporte: ' + response.message);
        }
      },
      error: (error) => {
        console.error('Error contacting support:', error);
        alert('Erro ao contatar suporte. Tente novamente.');
      }
    });
  }
}