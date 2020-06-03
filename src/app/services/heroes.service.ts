import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';

import { map, delay } from 'rxjs/operators'; //mapeo cualquier cosa observable, osea la respuesta del crud firebase

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

private url = 'https://crud-heroe-34ddb.firebaseio.com';

  constructor( private http: HttpClient) {

   }

   crearHeroe(heroe: HeroeModel){

    return this.http.post(`${this.url}/heroes.json`, heroe)
                .pipe(
                  map( (resp: any) =>{
                    heroe.id = resp.name; //crud responde el id en la clave name
                    return heroe;
                  })
                );

   }

   actualizarHeroe(heroe: HeroeModel){

 //copio el objeto heroe ...heroe
    const heroeTemp = {
      ...heroe
    };
   //hay que borrar el id del heroe porque no esta en el modelo en firebase
    delete heroeTemp.id;

    //.json es solo para firebase
    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp);
   }

   getHeroe(id: string){
     return this.http.get(`${this.url}/heroes/${id}.json`);
   }

   getHeroes(){

      return this.http.get(`${this.url}/heroes.json`)
      .pipe(
        map( this.crearArreglo ), //es lo mismo -> map( resp=> this.crearArreglo(resp))
        delay(1500) //para demorar la carga y ver el loading
      );
   }

   //creo el metodo para generar un arrglo de heroes, porque firebase devuelve un unico objecto con todos los heroes
   private crearArreglo(heroesObj: object){

    const heroes: HeroeModel[] =[];

    if ( heroesObj === null){
      return [];
    }
    Object.keys(heroesObj).forEach(key=>{
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;

      heroes.push( heroe );
    });


     return heroes;
   }

   borrarHeroe(id: string){

    return this.http.delete(`${this.url}/heroes/${id}.json`);

   }
}
