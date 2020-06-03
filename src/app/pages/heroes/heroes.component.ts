import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

heroes: HeroeModel[] = [];
cargando: boolean = false;


  constructor(private heroesService: HeroesService) { }

  ngOnInit() {
    this.cargando = true;
    this.heroesService.getHeroes()
        .subscribe(resp => {
          this.heroes = resp;
          this.cargando = false;} );
  }

  borrarHeroe( heroe: HeroeModel, i: number){

    Swal.fire({
      title: 'Esta seguro?',
      text: `Desea eliminar al hero ${heroe.nombre}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
    }).then( resp=>{

      if(resp.value){
        this.heroes.splice(i,1); //borro el heroe de lista heroes
        this.heroesService.borrarHeroe(heroe.id).subscribe();
      }

    });

   
  }

}
