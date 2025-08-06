import { Component, Input } from '@angular/core';
import { RatingCommentCard } from '../rating-comment-card/rating-comment-card';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [RatingCommentCard],
  templateUrl: './rating.html',
})
export class Rating {
  maxRating: number = 5;

  @Input() rating: number = 0;
  @Input() comments: Array<{ name: string; rating: number; comment: string }> = [];

  get fullStars(): any[] {
    return Array(Math.ceil(this.rating));
  }

  get emptyStars(): any[] {
    return Array(this.maxRating - Math.round(this.rating));
  }
}
