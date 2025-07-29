import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { InfoCard } from '../../components/info-card/info-card';
import { PackageHighlightCard } from '../../components/package-highlight-card/package-highlight-card';
import { Rating } from '../../components/rating/rating';
import { SwiperContainer } from '../../components/swiper-container/swiper-container';

@Component({
  selector: 'app-package-detail',
  standalone: true,
  imports: [CommonModule, InfoCard, PackageHighlightCard, Rating, SwiperContainer],
  templateUrl: './package-detail.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PackageDetail {
  imageUrl: string = 'https://media.discordapp.net/attachments/1395018497578238014/1399776956026720356/image_85_2.png?ex=688a3b60&is=6888e9e0&hm=348df4b2eac802c53645ce4bc1570e91dd786860f029ca18bde7a1d5a5c95a05&=&format=webp&quality=lossless&width=1296&height=721';
}
