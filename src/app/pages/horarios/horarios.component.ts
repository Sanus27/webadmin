import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { Auth_Service } from '../../services/auth_service';
import { LocalStorageService } from '../../services/localstorage.service';
import { DoctoresService } from '../../services/doctores.service';
import { HorariosService } from '../../services/horarios.service';

import { Usuarios } from '../../models/Usuarios';

declare var $:any;

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html'
})
export class HorariosComponent implements OnInit {

  private err:boolean;
  private result:boolean;
  private error:string;
  private success:string;
  private uid:any;
  private updated:boolean;
  private next:boolean;
  private arr: Usuarios[] = [];
  private schedules: any[] = [];
  private dias = []
  private days = { Lunes: '', Martes: '', Miercoles: '', Jueves: '', Viernes: '', Sabado: '', Domingo: ''}
  private hours = { hora1: '', hora2: '', hora3: '', hora4: '', hora5: '', hora6: '', hora7: '' , hora8: '', hora9: '', hora10: '', hora11: '', hora12: '', hora13: '', hora14: '' }
  private doctors = { cedula:'', especialidad: '', hospital: '' }
  private daysArr = [ "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo" ]
  constructor( private _router:Router, private _auth:Auth_Service,  public _user: DoctoresService, private _sesion:LocalStorageService, private _hour:HorariosService ) {
    this.uid = this._sesion.cargarSesion();
    this.success = ""
    this.result = false
    this.err = false
    this.error = ""
    this.next = false
  }

  ngOnInit() {

    let uid = this._sesion.cargarSesion();
    if( uid){
        this._auth.showUser(uid).valueChanges().subscribe( resp =>{

            let dataUser = resp;
            if(dataUser["tipo"] != "Admin"){

              this._router.navigate(["/login"]);

            } else {

              this._user.getUsers().subscribe( (doctores: Usuarios[]) => {
                  this.arr = doctores;
              })

            }

        })
    } else {
      this._router.navigate(["/login"]);
    }

  }



  private showModal( i, user ){

    this.next = false
    this.updated = false;
    this.uid = user.id;

    if ( i === 1 ) {
      //insertar
      this.days = {
          Lunes: undefined,
          Martes: undefined,
          Miercoles: undefined,
          Jueves: undefined,
          Viernes: undefined,
          Sabado: undefined,
          Domingo: undefined
      }

      this.hours = {
          hora1: undefined,
          hora2: undefined,
          hora3: undefined,
          hora4: undefined,
          hora5: undefined,
          hora6: undefined,
          hora7: undefined,
          hora8: undefined,
          hora9: undefined,
          hora10: undefined,
          hora11: undefined,
          hora12: undefined,
          hora13: undefined,
          hora14: undefined
      }

    } else {
      //actualizar
      this.getData( this.uid )
      this.days = {
          Lunes: user.Lunes,
          Martes: user.Martes,
          Miercoles: user.Miercoles,
          Jueves: user.Jueves,
          Viernes: user.Viernes,
          Sabado: user.Sábado,
          Domingo: user.Domingo
      }

      this.hours = {
          hora1: user.hora1,
          hora2: user.hora2,
          hora3: user.hora3,
          hora4: user.hora4,
          hora5: user.hora5,
          hora6: user.hora6,
          hora7: user.hora7,
          hora8: user.hora8,
          hora9: user.hora9,
          hora10: user.hora10,
          hora11: user.hora11,
          hora12: user.hora12,
          hora13: user.hora13,
          hora14: user.hora14
      }

    }
    this.success = ""
    this.result = false
    $('#modal').modal('show');
  }

  private getData( uid ){
    this._hour.getHours( uid ).subscribe( (hours: any[]) => {

       for ( var i = 0; i <= hours.length - 1 ; i ++ ){
          if ( hours[i]["id"] == uid) {
            this.selectCheckbox( hours[i]["dias"] )
            this.schedules.push( hours[i]["dias"] )
          }
       }


    })
  }

  private selectCheckbox( dia ){

    this.days = {
        Lunes: "1",
        Martes: "1",
        Miercoles: "1",
        Jueves: "1",
        Viernes: "1",
        Sabado: "1",
        Domingo: "1"
    }

    for ( var i = 0; i <= dia.length - 1 ; i ++ ){

        if (dia[i] == this.daysArr[0] ) {
            this.days.Lunes = undefined
        }
        if (dia[i] == this.daysArr[1] ) {
            this.days.Martes = undefined
        }
        if (dia[i] == this.daysArr[2] ) {
            this.days.Miercoles = undefined
        }
        if (dia[i] == this.daysArr[3] ) {
            this.days.Jueves = undefined
        }
        if (dia[i] == this.daysArr[4] ) {
            this.days.Viernes = undefined
        }
        if (dia[i] == this.daysArr[5] ) {
            this.days.Sabado = undefined
        }
        if (dia[i] == this.daysArr[6] ) {
            this.days.Domingo = undefined
        }

    }

  }

  private showDelete( user ){
    this.uid = user;
    console.log( this.uid );
    $('#eliminarUsuario').modal('show');
  }

  private nextView(){
    this.next = true
  }

  private preView(){
    this.next = false
  }

  private createUser(){
    this.err = false
    console.log( this.hours )
    console.log( this.days )
    // this._hour.addHour(this.days).then( (data => {
    //
    // })).catch( (error) => {
    //
    // })
  }

  private delete(){
    this.err = false
    this.result = false
    this._user.deleteUser( this.uid ).then( (resp) => {
      this.result = true
      this.success = "Se ha eliminado con exito el usuario"
    }).catch( (error) => {
      this.err = true
      this.error = "Se ha producido un error, intentalo mas tarde"
    })

  }

  private updateUser( ){
    this.err = false
    this.result = false
    this._user.update( this.uid, this.days ).then( (resp) => {
      this.result = true
      this.success = "Se han hecho los cambios correctamente"
    }).catch( (error) => {
      this.err = true
      this.error = "Se ha producido un error, intentalo mas tarde"
    })
  }



}
