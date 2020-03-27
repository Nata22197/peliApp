import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: []
})
export class BuscarComponent implements OnInit {
  
  buscar:string = "";

  constructor( public peliculasService: PeliculasService,
               private activatedRoute: ActivatedRoute ) { 
      this.activatedRoute.params.subscribe( parametros => {
        if (parametros.texto) {
          this.buscar = parametros.texto;
          this.buscarPelicula();
        }
      })
  }

  ngOnInit(): void {
  }
  
  buscarPelicula() {
    if (this.buscar.length == 0) {
      return;
    }

    this.peliculasService.buscarPelicula(this.buscar).subscribe();
  }
}
