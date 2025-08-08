import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { InfoCard } from '../../components/info-card/info-card';
import { PackageHighlightCard } from '../../components/package-highlight-card/package-highlight-card';
import { Rating } from '../../components/rating/rating';
import { SwiperContainer } from '../../components/swiper-container/swiper-container';
import { PackageService } from '../../services/packageService';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleMapsComponent } from '../../components/google-maps/google-maps';
import { Navbar } from "../../components/navbar/navbar";

@Component({
  selector: 'app-package-detail',
  standalone: true,
  imports: [CommonModule, InfoCard, PackageHighlightCard, Rating, SwiperContainer, GoogleMapsComponent, Navbar],
  templateUrl: './package-detail.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PackageDetail {
  imageUrl: string = 'https://media.discordapp.net/attachments/1395018497578238014/1399776956026720356/image_85_2.png?ex=688a3b60&is=6888e9e0&hm=348df4b2eac802c53645ce4bc1570e91dd786860f029ca18bde7a1d5a5c95a05&=&format=webp&quality=lossless&width=1296&height=721';
  item: any = null;

  showButton: boolean = false;

  constructor(private packageService: PackageService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.packageService.getPackageById(id).subscribe({
      next: (res) => {
        this.item = res,
        console.log(`Package Details: X`, this.item);
      },
      error: (err) => this.router.navigate(['/404'])

    });
    window.scrollTo(0, 0);
  }

  getLowerAvailabilityPrice(availabilities: any[]): number {
    if (!availabilities || availabilities.length === 0) {
      return 0;
    }
    const prices = availabilities.map(a => a.price);
    const minPrice = Math.min(...prices);
    return minPrice;
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }

  makeReservations(reservationId: number) {
    this.router.navigate(['/checkout'], {
      queryParams: {
        travelers: 1,
        availabilityId: reservationId,
        packageId: this.item.id,
        packageTitle: this.item.title
      }
    });
  }

  
}
