import { Component, Input, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-google-maps',
  template: `<iframe
      width="100%"
      height="400"
      style="border:0"
      loading="lazy"
      allowfullscreen
      referrerpolicy="no-referrer-when-downgrade"
      [src]="safeUrl"
    ></iframe>`
})
export class GoogleMapsComponent {
  @Input() place: string = '';
  safeUrl: SafeResourceUrl | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['place'] && this.place) {
      const url = `https://www.google.com/maps?q=${encodeURIComponent(this.place)}&output=embed`;
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }
}
