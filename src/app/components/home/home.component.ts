import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  
  cartelera:any[]= null;
  populares:any[]= null;
  populares_boys:any[]= null;
  constructor( public peliculasService: PeliculasService ) { 
    this.peliculasService.getCartelera().subscribe( response => this.cartelera = response );

    this.peliculasService.getPopulares().subscribe( response => this.populares = response );

    this.peliculasService.getPopularesNinos().subscribe( response => this.populares_boys = response );

  }

  ngOnInit(): void {
  }

}
