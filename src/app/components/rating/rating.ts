import { Component, Input } from '@angular/core';
import { RatingCommentCard } from '../rating-comment-card/rating-comment-card';
import { RatingService } from '../../services/rating.service';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [RatingCommentCard],
  templateUrl: './rating.html',
})
export class Rating {
  maxRating: number = 5;
  comments: Array<any> = [];
  rating: number = 0;

  constructor(private ratingService: RatingService) {}

  @Input() packageId: number = 0;

  ngOnInit() {
    console.log('Package ID:', this.packageId);
    this.ratingService.getRatings(this.packageId).subscribe({
      next: (data) => {
        this.comments = data;

        if (this.comments.length > 0) {
          const somaRatings = this.comments.reduce((total, item) => total + item.rating, 0);
          this.rating = somaRatings / this.comments.length;
        } else {
          this.rating = 0; // caso não haja avaliações
        }

      },
      error: (err) => {
        console.error('Error fetching ratings:', err);
      }
    });
  }

  get fullStars(): any[] {
    return Array(Math.ceil(this.rating));
  }

  get emptyStars(): any[] {
    return Array(this.maxRating - Math.round(this.rating));
  }
}
