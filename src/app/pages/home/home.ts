import { Component } from '@angular/core';
import { Navbar } from "../../components/navbar/navbar";
import { Footer } from "../../components/footer/footer";
import { Searchbar } from "../../components/searchbar/searchbar";

@Component({
  selector: 'app-home',
  imports: [Navbar, Footer, Searchbar],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
