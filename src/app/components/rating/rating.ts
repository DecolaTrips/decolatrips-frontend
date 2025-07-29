import { Component } from '@angular/core';
import { RatingCommentCard } from '../rating-comment-card/rating-comment-card';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [RatingCommentCard],
  templateUrl: './rating.html',
})
export class Rating {
  comments: Array<{ name: string; rating: string; comment: string }> = [
    {
      name: 'Ricardo Almeida',
      rating: '★★★★★',
      comment: 'Uma experiência incrível! As Pirâmides ao pôr do sol e o passeio pelo Rio Nilo foram de tirar o fôlego. O Templo de Luxor é impressionante e a organização da viagem foi excelente. Recomendo para quem ama história e quer viver algo único!',
    },
    {
      name: 'Maria Silva',
      rating: '★★★★☆',
      comment: 'A viagem foi muito bem organizada, mas achei que faltou um pouco mais de tempo em alguns locais. No geral, uma experiência maravilhosa!',
    },
    {
      name: 'João Pereira',
      rating: '★★★★★',
      comment: 'Adorei cada momento! A equipe foi super atenciosa e os guias eram muito conhecedores da história local.',
    }
  ];
}
