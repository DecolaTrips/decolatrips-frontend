import { Component } from '@angular/core';
import { Navbar } from "../../components/navbar/navbar";
import { Footer } from "../../components/footer/footer";
import { PackageCard } from '../../components/package-card/package-card';

@Component({
  selector: 'app-destinos-internacionais',
  imports: [Navbar, Footer, PackageCard],
  templateUrl: './destinos-internacionais.html',
  styleUrl: './destinos-internacionais.css'
})
export class DestinosInternacionais {

}
