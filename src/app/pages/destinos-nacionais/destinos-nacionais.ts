import { Component } from '@angular/core';
import { Navbar } from "../../components/navbar/navbar";
import { Footer } from "../../components/footer/footer";
import { PackageCard } from '../../components/package-card/package-card';

@Component({
  selector: 'app-destinos-nacionais',
  imports: [Navbar, Footer, PackageCard],
  templateUrl: './destinos-nacionais.html',
  styleUrl: './destinos-nacionais.css'
})
export class DestinosNacionais {

}
