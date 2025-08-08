import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product, BookedPackage } from '../../models/package.interface';
import { PackageMedia } from '../../models/package-media';

@Component({
  selector: 'app-package-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './package-card.component.html',
  styleUrls: ['./package-card.component.css'],
})
export class PackageCardComponent {
  @Input() products: Product[] = [];
  @Input() bookedPackages: BookedPackage[] = [];
  @Input() mode: 'catalog' | 'my-packages' = 'catalog';

  @Output() productClick = new EventEmitter<Product>();
  @Output() viewDetails = new EventEmitter<number>();
  @Output() downloadVoucher = new EventEmitter<number>();
  @Output() contactSupport = new EventEmitter<number>();

  ngOnInit() {
    console.log(this.bookedPackages);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['bookedPackages']) {
      this.bookedPackages = [...changes['bookedPackages'].currentValue];
    }
  }

  onProductClick(product: Product): void {
    console.log('Produto clicado:', product);
    this.productClick.emit(product);
  }

  getImageUrl(travelPackageImage: PackageMedia): string {
    return travelPackageImage ? "assets" + travelPackageImage.urlImg : '';
  }

  onViewDetails(packageId: number): void {
    this.viewDetails.emit(packageId);
  }

  onDownloadVoucher(packageId: number): void {
    this.downloadVoucher.emit(packageId);
  }

  onContactSupport(packageId: number): void {
    this.contactSupport.emit(packageId);
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'confirmed':
        return 'Confirmado';
      case 'pending':
        return 'Pendente';
      case 'cancelled':
        return 'Cancelado';
      default:
        return 'Desconhecido';
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Confirmada':
        return 'bg-green-100 text-green-800';
      case 'Pendente':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getStatusClasses(status: string): string {
    return this.getStatusClass(status);
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  }
}