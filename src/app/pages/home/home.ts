import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Navbar } from "../../components/navbar/navbar";
import { Footer } from "../../components/footer/footer";
import { Searchbar } from "../../components/searchbar/searchbar";
import { PackageCard } from "../../components/package-card/package-card";
import { PackageService } from "../../services/packageService";

@Component({
  selector: 'app-home',
  imports: [Navbar, Footer, Searchbar, PackageCard],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements AfterViewInit, OnInit {
  @ViewChild('homeVideo') homeVideo!: ElementRef<HTMLVideoElement>;
  packageData: any;

  constructor(private packageService: PackageService) { }

  ngOnInit() {
    this.packageService.getAllPackages().subscribe({
      next: (res) => {
        this.packageData = res;
        console.log(`All Packages:`, this.packageData);
      },
      error: (err) => console.error(err)
    });
  }

  ngAfterViewInit(): void {
    const videoEl = this.homeVideo.nativeElement;

    // Ensure video is muted for autoplay compliance
    videoEl.muted = true;

    // Simple autoplay attempt
    videoEl.play().catch(error => {
      console.warn('Video autoplay failed:', error);
    });
  }
}


