import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination-component',
  imports: [CommonModule],
  templateUrl: './pagination-component.html',
  styleUrl: './pagination-component.css'
})
export class PaginationComponent {
  @Input() currentPage: number = 0;
  @Input() totalPages: number = 0;
  @Output() pageChange = new EventEmitter<number>();

  get visiblePages(): number[] {
    if (this.totalPages <= 1) return [];
    
    const pages: number[] = [];
    const current = this.currentPage + 1; // Converter para 1-indexed
    
    // Sempre mostrar até 2 páginas após a atual (se existirem)
    if (current + 1 <= this.totalPages) {
      pages.push(current + 1);
    }
    if (current + 2 <= this.totalPages) {
      pages.push(current + 2);
    }
    
    return pages;
  }

  get showLastPage(): boolean {
    const current = this.currentPage + 1;
    return this.totalPages > 3 && current < this.totalPages - 2;
  }

  get showEllipsis(): boolean {
    const current = this.currentPage + 1;
    return this.totalPages > 4 && current < this.totalPages - 3;
  }

  onPageClick(page: number) {
    this.pageChange.emit(page - 1); // Converter para 0-indexed
  }

  onPreviousClick() {
    if (this.currentPage > 0) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  onNextClick() {
    if (this.currentPage < this.totalPages - 1) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }

  onLastPageClick() {
    this.pageChange.emit(this.totalPages - 1);
  }
}