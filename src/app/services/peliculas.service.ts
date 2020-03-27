import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


HttpClient
@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  private apiKey:string = "19832d88fe1498f549d8a31e1e68fca3";
  private url:string = "https://api.themoviedb.org/3/"
  peliculas:any[] = null;
  constructor( private http: HttpClient ) { }
  
  getCartelera() {
    let desde = new Date();
    let hasta = new Date();
    hasta.setDate(hasta.getDate() + 7);
    //let desdeStr = `${desde.getFullYear()}-${desde.getMonth()+1}-${desde.getDate()}`;
    // let hastaStr = `${desde.getFullYear()}-${desde.getMonth()+1}-${desde.getDate()}`;
    let desdeStr = desde.toISOString().substring(0,10);
    let hastaStr = hasta.toISOString().substring(0,10);
    

    let url = `${ this.url }discover/movie?primary_release_date.gte=${desdeStr}&primary_release_date.lte=${hastaStr}&api_key=${this.apiKey}&language=es`;
    return this.http.get( url )
                      .pipe(map( (res: any) => res.results));
   
  }

  getPopulares() {
    let url = `${ this.url }discover/movie?sort_by=popularity.desc&api_key=${this.apiKey}&language=es`;

    return this.http.get(url)
                    .pipe(map ((response:any) => response.results ));
  }

  getPopularesNinos() {
    let url = `${ this.url }discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=${this.apiKey}&language=es`;
    return this.http.get( url )
                    .pipe(map( (res: any) => res.results));
  }

  buscarPelicula( texto: string ) {
    let url = `${ this.url }search/movie?query=${ texto }&sort_by=popularity.desc&api_key=${ this.apiKey }&language=es`;
    // &callback=JSONP_CALLBACK
    return this.http.get( url ).pipe(map( (res: any)  =>{
      this.peliculas = res.results;
      return res.results
    })
    );
  }

  getPelicula(id:string) {
    let url = `${ this.url }movie/${id}?api_key=${this.apiKey}&language=es`;
    return this.http.get( url )
                    .pipe(map( (res: any) => res));
  }
}
