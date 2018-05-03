import { Component, OnInit } from '@angular/core';
import { AngularFirestore,  AngularFirestoreCollection } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Auth_Service } from '../../services/auth_service';
import { LocalStorageService } from '../../services/localstorage.service';
import { DoctoresService } from '../../services/doctores.service';
import { HorariosService } from '../../services/horarios.service';

import { Doctores } from '../../models/Doctores';
import { Horarios } from '../../models/Horarios';

declare var $:any;

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html'
})
export class HorariosComponent implements OnInit {

  private err:boolean;
  private loading:boolean;
  private showHours:boolean;
  private result:boolean;
  private error:string;
  private success:string;
  private uid:any;
  private updated:boolean;
  private arr: any;
  private next:boolean;
  private days = { Lunes:'', Martes: '', Miercoles: '', Jueves: '', Viernes: '', Sabado: '', Domingo: '' };

  private doctorcollection: AngularFirestoreCollection<Doctores>;
  private Lunes:string = "1";
  private Martes:string = "1";
  private Miercoles:string = "1";
  private Jueves:string = "1";
  private Viernes:string = "1";
  private Sabado:string = "1";
  private Domingo:string = "1";
  private diasSelected:any;
  private selectedDay:any;

  private selectedDay27:any;

  private arrLunes:any;
  private arrMartes:any;
  private arrMiercoles:any;
  private arrJuevez:any;
  private arrViernes:any;
  private arrSabado:any;
  private arrDomingo:any;

  private hora1:any;
  private hora2:any;
  private hora3:any;
  private hora4:any;
  private hora5:any;
  private hora6:any;
  private hora7:any;
  private hora8:any;
  private hora9:any;
  private hora10:any;
  private hora11:any;
  private hora12:any;
  private hora13:any;
  private hora14:any;

  private diasArr = [ "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo" ]
  private horasArr = [ "6:00 am - 7:00 am", "7:00 am - 8:00 am", "8:00 am - 9:00 am", "9:00 am - 10:00 am",  "10:00 am - 11:00 am", "11:00 am - 12:00 pm", "12:00 pm - 1:00 pm", "1:00 pm - 2:00 pm", "2:00 pm - 3:00 pm", "3:00 pm - 4:00 pm", "4:00 pm - 5:00 pm", "5:00 pm - 6:00 pm", "6:00 pm - 7:00 pm", "7:00 pm - 8:00 pm" ]

  constructor( private _router:Router, private _auth:Auth_Service,  public _user: DoctoresService, private _sesion:LocalStorageService, public _db: AngularFirestore, private _hour:HorariosService ) {
    this.uid = this._sesion.cargarSesion();
    this.success = ""
    this.result = false
    this.err = false
    this.error = ""
    this.next = false
    this.showHours = false
    this.loading = false
  }

  ngOnInit() {

    let uid = this._sesion.cargarSesion();
    if( uid){
        this._auth.showUser(uid).valueChanges().subscribe( resp =>{

            let dataUser = resp;
            if(dataUser["tipo"] != "Admin"){

              this._router.navigate(["/login"]);

            } else {

              this.doctorcollection = this._db.collection('usuarios');
              this.arr = this.doctorcollection.snapshotChanges().map(
                changes => { return changes.map( a => {
                    const data = a.payload.doc.data() as Doctores;
                    data.id = a.payload.doc.id;
                    return data;
                });
              });


            }

        })
    } else {
      this._router.navigate(["/login"]);
    }

  }

  private showModal( id, user ){
    this.next = false
    this.showHours = false
    this.loading = false
    this.uid = user.id;

    this.arrLunes = []
    this.arrMartes = []
    this.arrMiercoles = []
    this.arrJuevez = []
    this.arrViernes = []
    this.arrSabado = []
    this.arrDomingo = []

    if( id == 1){
      this.newDoctor()
    }
    if( id == 2){
      this.editDoctor(user);
    }
    this.success = ""
    this.result = false
  }

  private newDoctor(){
      this.updated = false;
      this.days = {
          Lunes: undefined,
          Martes: undefined,
          Miercoles: undefined,
          Jueves: undefined,
          Viernes: undefined,
          Sabado: undefined,
          Domingo: undefined
      }

      this.hora1 = false;
      this.hora2 = false;
      this.hora3 = false;
      this.hora4 = false;
      this.hora5 = false;
      this.hora6 = false;
      this.hora7 = false;
      this.hora8 = false;
      this.hora9 = false;
      this.hora10 = false;
      this.hora11 = false;
      this.hora12 = false;
      this.hora13 = false;
      this.hora14 = false;

      $('#modal').modal('show');
  }

  private editDoctor( user ){
    this.updated = true;
    this.uid = user.id;
    this._hour.getDays( this.uid ).subscribe( data => {

      this.Lunes = "1"
      this.Martes = "1"
      this.Miercoles = "1";
      this.Jueves = "1"
      this.Viernes = "1"
      this.Sabado = "1"
      this.Domingo = "1"

        this.days = {
           Lunes: "1",
           Martes: "1",
           Miercoles: "1",
           Jueves: "1",
           Viernes: "1",
           Sabado: "1",
           Domingo: "1"
        }

        for ( var i = 0; i <= this._hour.dias.length - 1 ; i ++ ) {

           if ( this._hour.dias[i] == this.diasArr[0] ) {
             this.Lunes = undefined
           }
           if ( this._hour.dias[i] == this.diasArr[1] ) {
             this.Martes = undefined
           }
           if ( this._hour.dias[i] == this.diasArr[2] ) {
             this.Miercoles = undefined
           }
           if ( this._hour.dias[i] == this.diasArr[3] ) {
             this.Jueves = undefined
           }
           if ( this._hour.dias[i] == this.diasArr[4] ) {
             this.Viernes = undefined
           }
           if ( this._hour.dias[i] == this.diasArr[5] ) {
             this.Sabado = undefined
           }
           if ( this._hour.dias[i] == this.diasArr[6] ) {
             this.Domingo = undefined
           }

        }


        this.days = {
            Lunes: this.Lunes,
            Martes: this.Martes,
            Miercoles: this.Miercoles,
            Jueves: this.Jueves,
            Viernes: this.Viernes,
            Sabado: this.Sabado,
            Domingo: this.Domingo
        }

        $('#modal').modal('show');



    })




  }

  private nextView(){
    this.next = true
    this.selectedDay = []
    this.diasSelected = ["Seleciona las horas de cada día"]
    //dias selecionados para mostrar en actualizar
    if ( this.updated ){

        if ( this.Lunes != undefined ){
          this.diasSelected.push("Lunes")
        }

        if ( this.Martes != undefined ){
          this.diasSelected.push("Martes")
        }

        if ( this.Miercoles != undefined ){
          this.diasSelected.push("Miércoles")
        }

        if ( this.Jueves != undefined ){
          this.diasSelected.push("Jueves")
        }

        if ( this.Viernes != undefined ){
          this.diasSelected.push("Viernes")
        }

        if ( this.Sabado != undefined ){
          this.diasSelected.push("Sábado")
        }

        if ( this.Domingo != undefined ){
          this.diasSelected.push("Domingo")
        }
   } else {

          //dias selecionados para mostrar en insertar
          if ( this.days.Lunes != undefined ){
              this.selectedDay.push("Lunes")
              this.diasSelected.push("Lunes")
          }
          if ( this.days.Martes != undefined ){
              this.selectedDay.push("Martes")
              this.diasSelected.push("Martes")
          }
          if ( this.days.Miercoles != undefined ){
              this.selectedDay.push("Miércoles")
              this.diasSelected.push("Miércoles")
          }
          if ( this.days.Jueves != undefined ){
              this.selectedDay.push("Jueves")
              this.diasSelected.push("Jueves")
          }
          if ( this.days.Viernes != undefined ){
              this.selectedDay.push("Viernes")
              this.diasSelected.push("Viernes")
          }
          if ( this.days.Sabado != undefined ){
              this.selectedDay.push("Sábado")
              this.diasSelected.push("Sábado")
          }
          if ( this.days.Domingo != undefined ){
              this.selectedDay.push("Domingo")
              this.diasSelected.push("Domingo")
          }

    }

  }

  private onChangeDays( value ) {

    if ( value != "Seleciona las horas de cada día" ) {

      this.showHours = false
      this.loading = true
      this.selectedDay27 = value

      this.hora1 = false;
      this.hora2 = false;
      this.hora3 = false;
      this.hora4 = false;
      this.hora5 = false;
      this.hora6 = false;
      this.hora7 = false;
      this.hora8 = false;
      this.hora9 = false;
      this.hora10 = false;
      this.hora11 = false;
      this.hora12 = false;
      this.hora13 = false;
      this.hora14 = false;

        this.showHours = true
        this.loading = false

    } else {
      this.showHours = false
      this.loading = false
    }




  }

  private preView(){
    this.next = false
  }

  private showDelete( user ){
    this.uid = user;
    $('#eliminarUsuario').modal('show');
  }

  private createUser(){
    this.err = false

    console.log("guardar")
    console.log( this.arrLunes )



    // let data = {
    //   id: 'bbjimesunabbnojona',
    //   dia: 'Lunes',
    //   hora: '2:27'
    // }
    // this._hour.addHour( data ).then( (data => {
    //   this.result = true
    //   this.success = "Se ha guardado el horario correctamente"
    // })).catch( (error) => {
    //   console.log("error")
    //   console.log(error)
    //   if (error.code == "auth/email-already-in-use") {
    //     this.err = true
    //     this.error = "Este correo ya tiene una cuenta"
    //     console.log("auth/email-already-in-use")
    //   }
    // })
  }

  private delete(){
    this.err = false
    this.result = false
    this.arrLunes = []
    // this._hour.deleteUser( this.uid ).then( (resp) => {
    //   this.result = true
    //   this.success = "Se ha eliminado con exito el usuario"
    // }).catch( (error) => {
    //   this.err = true
    //   this.error = "Se ha producido un error, intentalo mas tarde"
    // })

  }

  private updateUser(){
    this.err = false
    this.result = false
    this.arrLunes = []
    console.log( this.selectedDay )
    // this._hour.update( this.users ).then( (resp) => {
    //   this.result = true
    //   this.success = "Se han hecho los cambios correctamente"
    // }).catch( (error) => {
    //   this.err = true
    //   this.error = "Se ha producido un error, intentalo mas tarde"
    // })
  }

  private remove(arr, item) {
     var i;
     while((i = arr.indexOf(item)) !== -1) {
       arr.splice(i, 1);
     }
  }

  private selectData( value, event ) {

    if ( this.selectedDay27 == this.diasArr[0] ) {

        if ( value == "hora1") {
            if (event) {
                this.arrLunes.push("6:00 am - 7:00 am")
            } else {
                this.remove(this.arrLunes, "6:00 am - 7:00 am")
            }
        }

        if ( value == "hora2") {
            if (event) {
                this.arrLunes.push("7:00 am - 8:00 am")
            } else {
                this.remove(this.arrLunes, "7:00 am - 8:00 am")
            }
        }

    }

  }


}
