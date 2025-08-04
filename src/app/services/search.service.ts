import { Injectable, signal } from '@angular/core';

export interface SearchData {
  adults: number;
  children: number;
  destination: string;
  totalTravelers: number;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private _searchData = signal<SearchData>({
    adults: 1,
    children: 0,
    destination: '',
    totalTravelers: 1
  });

  readonly searchData = this._searchData.asReadonly();

  updateSearchData(searchData: SearchData): void {
    this._searchData.set(searchData);
  }

  getCurrentSearchData(): SearchData {
    return this._searchData();
  }
}
