import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer  } from '@angular/platform-browser';

@Pipe({
  name: 'domSeguro'
})
export class DomSeguroPipe implements PipeTransform {
  
  constructor( private domSanitizer: DomSanitizer ) { }
  transform(pelicula: any, poster:boolean = false): any {
      
    let url:string = " http://image.tmdb.org/t/p/w500";

    if (poster) {
      return this.domSanitizer.bypassSecurityTrustResourceUrl (url + pelicula.poster_path);
    }

    if (pelicula.backdrop_path) {
      return this.domSanitizer.bypassSecurityTrustResourceUrl(url + pelicula.backdrop_path);
    } else {
      if (pelicula.poster_path) {
        return this.domSanitizer.bypassSecurityTrustResourceUrl (url + pelicula.poster_path);
      } else {
      return "assets/img/no_image.png";
      }
    }
  }

}
