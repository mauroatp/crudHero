import { Component, OnInit } from '@angular/core';
import { HeroeModel } from '../../models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';

//npm install sweetalert2, importo
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

heroe: HeroeModel = new HeroeModel();

  constructor( private heroesService: HeroesService,
                private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id'); //obtengo id si el heroe hay que editarlo y no crearlo

    if( id != 'nuevo' ) {
      this.heroesService.getHeroe(id)
          .subscribe((resp: HeroeModel) =>{
            this.heroe = resp;
            this.heroe.id = id;
          });
    }
  }

  guardar( f: NgForm ){

    if ( f.invalid ) {
      console.log('formulario invalido!!!');
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando informacion',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();//para no mostrar boton ok

    let peticion: Observable<any>;

    if( this.heroe.id){
      //this.heroesService.actualizarHeroe(this.heroe)
      //.subscribe( resp => {});
      peticion = this.heroesService.actualizarHeroe(this.heroe);
    }else{
      ///this.heroesService.crearHeroe(this.heroe)
      ///.subscribe( resp => {
      ///  this.heroe = resp; //no es necesario asignarlo pero por las dudas
      ///});
      peticion = this.heroesService.crearHeroe(this.heroe);
    }

    peticion.subscribe( resp => {
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se actualizo correctamente',
        icon: 'success'
      });
    });
  }
}
