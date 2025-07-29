import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating-comment-card',
  standalone: true,
  imports: [],
  templateUrl: './rating-comment-card.html',
})
export class RatingCommentCard {
  @Input() name: string = 'Ricardo Almeida';
  @Input() rating: string = '★★★★★';
  @Input() comment: string = 'Uma experiência incrível! As Pirâmides ao pôr do sol e o passeio pelo Rio Nilo foram de tirar o fôlego. O Templo de Luxor é impressionante e a organização da viagem foi excelente. Recomendo para quem ama história e quer viver algo único!';

}
