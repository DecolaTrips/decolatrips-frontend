import { Component } from '@angular/core';
import { Navbar } from "../../components/navbar/navbar";
import { Footer } from "../../components/footer/footer";
import { PackageService } from '../../services/packageService';
import { PackageCard } from '../../components/package-card/package-card';

@Component({
  selector: 'app-em-alta',
  imports: [Navbar, Footer, PackageCard],
  templateUrl: './em-alta.html',
  styleUrl: './em-alta.css'
})
export class EmAlta {
  item: any;

  constructor(private packageService: PackageService) { }

  ngOnInit() {
    this.packageService.getAllPackages().subscribe({
      next: (res) => {
        this.item = res;
        console.log(`All Packages:`, this.item);
      },
      error: (err) => console.error(err)
    });
  }
}
