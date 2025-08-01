import { Component } from '@angular/core';
import { Navbar } from "../../components/navbar/navbar";
import { Footer } from "../../components/footer/footer";
import { Searchbar } from "../../components/searchbar/searchbar";
import { PackageCard } from "../../components/package-card/package-card";

@Component({
  selector: 'app-home',
  imports: [Navbar, Footer, Searchbar, PackageCard],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
