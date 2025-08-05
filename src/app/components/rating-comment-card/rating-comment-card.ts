import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating-comment-card',
  standalone: true,
  imports: [],
  templateUrl: './rating-comment-card.html',
})
export class RatingCommentCard {
  maxRating: number = 5;

  @Input() name: string = 'Ricardo Almeida';
  @Input() rating: number = 0;
  @Input() comment: string = 'Uma experiência incrível! As Pirâmides ao pôr do sol e o passeio pelo Rio Nilo foram de tirar o fôlego. O Templo de Luxor é impressionante e a organização da viagem foi excelente. Recomendo para quem ama história e quer viver algo único!';

  get fullStars(): any[] {
    return Array(Math.ceil(this.rating));
  }

  get emptyStars(): any[] {
    return Array(this.maxRating - Math.round(this.rating));
  }
}
