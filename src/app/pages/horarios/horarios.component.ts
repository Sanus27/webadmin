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
  private exist:boolean;
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
  private arrAusent:any;

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

  private diasArr = [ "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo" ]
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
    this.exist = false
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

    this.arrAusent = []
    this.arrLunes = []
    this.arrMartes = []
    this.arrMiercoles = []
    this.arrJuevez = []
    this.arrViernes = []
    this.arrSabado = []
    this.arrDomingo = []

    this.removeAll(this.arrAusent)
    this.removeAll(this.arrLunes)
    this.removeAll(this.arrMartes)
    this.removeAll(this.arrMiercoles)
    this.removeAll(this.arrJuevez)
    this.removeAll(this.arrViernes)
    this.removeAll(this.arrSabado)
    this.removeAll(this.arrDomingo)

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
    this.diasSelected = ["Seleciona las horas de cada día"]
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
           if ( this._hour.dias[i] == 'Miércoles' ) {
             this.Miercoles = undefined
           }
           if ( this._hour.dias[i] == this.diasArr[3] ) {
             this.Jueves = undefined
           }
           if ( this._hour.dias[i] == this.diasArr[4] ) {
             this.Viernes = undefined
           }
           if ( this._hour.dias[i] == 'Sábado' ) {
             this.Sabado = undefined
           }
           if ( this._hour.dias[i] == this.diasArr[6] ) {
             this.Domingo = undefined
           }

        }

        if ( this.Lunes != undefined ){
          this.diasSelected.push("Lunes")
        }
        if ( this.Martes != undefined ){
          this.diasSelected.push("Martes")
        }
        if ( this.Miercoles != undefined ){
          this.diasSelected.push("Miercoles")
        }
        if ( this.Jueves != undefined ){
          this.diasSelected.push("Jueves")
        }
        if ( this.Viernes != undefined ){
          this.diasSelected.push("Viernes")
        }
        if ( this.Sabado != undefined ){
          this.diasSelected.push("Sabado")
        }
        if ( this.Domingo != undefined ){
          this.diasSelected.push("Domingo")
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
              this.selectedDay.push("Miercoles")
              this.diasSelected.push("Miercoles")
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
              this.selectedDay.push("Sabado")
              this.diasSelected.push("Sabado")
          }
          if ( this.days.Domingo != undefined ){
              this.selectedDay.push("Domingo")
              this.diasSelected.push("Domingo")
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

      if ( this.updated ){
        if( value == this.diasArr[2]){
          value = 'Miércoles'
        }
        if( value == this.diasArr[5]){
          value = 'Sábado'
        }
        this._hour.getHorarios( this.uid, value ).subscribe( data => {

          for(var i = 0; i < this._hour.horarios.length; i++){
            if ( this._hour.horarios[i] == this.horasArr[0]) {
              this.hora1 = true
            }
            if ( this._hour.horarios[i] == this.horasArr[1]) {
              this.hora2 = true
            }
            if ( this._hour.horarios[i] == this.horasArr[2]) {
              this.hora3 = true
            }
            if ( this._hour.horarios[i] == this.horasArr[3]) {
              this.hora4 = true
            }
            if ( this._hour.horarios[i] == this.horasArr[4]) {
              this.hora5 = true
            }
            if ( this._hour.horarios[i] == this.horasArr[5]) {
              this.hora6 = true
            }
            if ( this._hour.horarios[i] == this.horasArr[6]) {
              this.hora7 = true
            }
            if ( this._hour.horarios[i] == this.horasArr[7]) {
              this.hora8 = true
            }
            if ( this._hour.horarios[i] == this.horasArr[8]) {
              this.hora9 = true
            }
            if ( this._hour.horarios[i] == this.horasArr[9]) {
              this.hora10 = true
            }
            if ( this._hour.horarios[i] == this.horasArr[10]) {
              this.hora11 = true
            }
            if ( this._hour.horarios[i] == this.horasArr[11]) {
              this.hora12 = true
            }
            if ( this._hour.horarios[i] == this.horasArr[12]) {
              this.hora13 = true
            }
            if ( this._hour.horarios[i] == this.horasArr[13]) {
              this.hora14 = true
            }
          }

        })
      }

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

    if (this.arrLunes.length > 0) {

        for( var i = 0; i < this.arrLunes.length ; i++ ){

            let data = {
              id: this.uid,
              dia: 'Lunes',
              hora: this.arrLunes[i]
            }
            this._hour.addHour( data ).then( (data => {
                this.result = true
                this.success = "Se ha guardado el horario correctamente"
            })).catch( (error) => {
                console.log("error")
                console.log(error)
            })

        }

    } else {
        this.arrAusent.push("Lunes")
    }


    if (this.arrMartes.length > 0) {

        for( var i = 0; i < this.arrMartes.length ; i++ ){

            let data = {
              id: this.uid,
              dia: 'Martes',
              hora: this.arrMartes[i]
            }
            this._hour.addHour( data ).then( (data => {
                this.result = true
                this.success = "Se ha guardado el horario correctamente"
            })).catch( (error) => {
                console.log("error")
                console.log(error)
            })

        }

    } else {
        this.arrAusent.push("Martes")
    }


    if (this.arrMiercoles.length > 0) {

        for( var i = 0; i < this.arrMiercoles.length ; i++ ){

            let data = {
              id: this.uid,
              dia: 'Miércoles',
              hora: this.arrMiercoles[i]
            }
            this._hour.addHour( data ).then( (data => {
                this.result = true
                this.success = "Se ha guardado el horario correctamente"
            })).catch( (error) => {
                console.log("error")
                console.log(error)
            })

        }

    } else {
        this.arrAusent.push("Miércoles")
    }



    if (this.arrJuevez.length > 0) {

        for( var i = 0; i < this.arrJuevez.length ; i++ ){

            let data = {
              id: this.uid,
              dia: 'Jueves',
              hora: this.arrJuevez[i]
            }
            this._hour.addHour( data ).then( (data => {
                this.result = true
                this.success = "Se ha guardado el horario correctamente"
            })).catch( (error) => {
                console.log("error")
                console.log(error)
            })

        }

    } else {
        this.arrAusent.push("Jueves")
    }



    if (this.arrViernes.length > 0) {

        for( var i = 0; i < this.arrViernes.length ; i++ ){

            let data = {
              id: this.uid,
              dia: 'Viernes',
              hora: this.arrViernes[i]
            }
            this._hour.addHour( data ).then( (data => {
                this.result = true
                this.success = "Se ha guardado el horario correctamente"
            })).catch( (error) => {
                console.log("error")
                console.log(error)
            })

        }

    } else {
        this.arrAusent.push("Viernes")
    }



    if (this.arrSabado.length > 0) {

        for( var i = 0; i < this.arrSabado.length ; i++ ){

            let data = {
              id: this.uid,
              dia: 'Sábado',
              hora: this.arrSabado[i]
            }
            this._hour.addHour( data ).then( (data => {
                this.result = true
                this.success = "Se ha guardado el horario correctamente"
            })).catch( (error) => {
                console.log("error")
                console.log(error)
            })

        }

    } else {
        this.arrAusent.push("Sábado")
    }


    if (this.arrDomingo.length > 0) {

        for( var i = 0; i < this.arrDomingo.length ; i++ ){

            let data = {
              id: this.uid,
              dia: 'Domingo',
              hora: this.arrDomingo[i]
            }
            this._hour.addHour( data ).then( (data => {
                this.result = true
                this.success = "Se ha guardado el horario correctamente"
            })).catch( (error) => {
                console.log("error")
                console.log(error)
            })

        }

    } else {
        this.arrAusent.push("Domingo")
    }


    this.addAusent()






  }

  private addAusent(){
    this._hour.addAusent( this.uid, this.arrAusent ).then( (data => {
        console.log(data)
    })).catch( (error) => {
        console.log("error")
        console.log(error)
    })
  }

  private updateAusent(){
    this._hour.updateAusent( this.uid, this.arrAusent ).then( (data => {
        console.log(data)
    })).catch( (error) => {
        console.log("error")
        console.log(error)
    })
  }

  private delete(){
    this._hour.deleteHour( this.uid.id ).then( (resp) => {
      this.result = true
      this.success = "Se ha eliminado con exito el usuario"
    }).catch( (error) => {
      this.err = true
      this.error = "Se ha producido un error, intentalo mas tarde"
    })
  }

  private updateUser(){
    this.err = false
    this.result = false
    console.log( this.uid )
    console.log( this.arrLunes )

    // if (this.arrLunes.length > 0) {
    //
    //     for( var i = 0; i < this.arrLunes.length ; i++ ){
    //
    //         let data = {
    //           id: this.uid,
    //           dia: 'Lunes',
    //           hora: this.arrLunes[i]
    //         }
    //
    //         this._hour.updateHour( data ).then( (resp) => {
    //            this.result = true
    //            this.success = "Se han hecho los cambios correctamente"
    //         }).catch( (error) => {
    //            console.log(error)
    //         })
    //
    //     }
    //
    // } else {
    //     this.arrAusent.push("Lunes")
    // }
    //
    // if (this.arrMartes.length > 0) {
    //
    //     for( var i = 0; i < this.arrMartes.length ; i++ ){
    //
    //         let data = {
    //           id: this.uid,
    //           dia: 'Martes',
    //           hora: this.arrMartes[i]
    //         }
    //
    //         this._hour.updateHour( data ).then( (resp) => {
    //            this.result = true
    //            this.success = "Se han hecho los cambios correctamente"
    //         }).catch( (error) => {
    //            console.log(error)
    //         })
    //
    //     }
    //
    // } else {
    //     this.arrAusent.push("Martes")
    // }
    //
    // if (this.arrMiercoles.length > 0) {
    //
    //     for( var i = 0; i < this.arrMiercoles.length ; i++ ){
    //
    //         let data = {
    //           id: this.uid,
    //           dia: 'Miércoles',
    //           hora: this.arrMiercoles[i]
    //         }
    //
    //         this._hour.updateHour( data ).then( (resp) => {
    //            this.result = true
    //            this.success = "Se han hecho los cambios correctamente"
    //         }).catch( (error) => {
    //            console.log(error)
    //         })
    //
    //     }
    //
    // } else {
    //     this.arrAusent.push("Miércoles")
    // }
    //
    //
    //
    // if (this.arrJuevez.length > 0) {
    //
    //     for( var i = 0; i < this.arrJuevez.length ; i++ ){
    //
    //         let data = {
    //           id: this.uid,
    //           dia: 'Jueves',
    //           hora: this.arrJuevez[i]
    //         }
    //
    //         this._hour.updateHour( data ).then( (resp) => {
    //            this.result = true
    //            this.success = "Se han hecho los cambios correctamente"
    //         }).catch( (error) => {
    //            console.log(error)
    //         })
    //
    //     }
    //
    // } else {
    //     this.arrAusent.push("Jueves")
    // }
    //
    //
    // if (this.arrViernes.length > 0) {
    //
    //     for( var i = 0; i < this.arrViernes.length ; i++ ){
    //
    //         let data = {
    //           id: this.uid,
    //           dia: 'Viernes',
    //           hora: this.arrViernes[i]
    //         }
    //
    //         this._hour.updateHour( data ).then( (resp) => {
    //            this.result = true
    //            this.success = "Se han hecho los cambios correctamente"
    //         }).catch( (error) => {
    //            console.log(error)
    //         })
    //
    //     }
    //
    // } else {
    //     this.arrAusent.push("Viernes")
    // }
    //
    //
    // if (this.arrSabado.length > 0) {
    //
    //     for( var i = 0; i < this.arrSabado.length ; i++ ){
    //
    //         let data = {
    //           id: this.uid,
    //           dia: 'Sábado',
    //           hora: this.arrSabado[i]
    //         }
    //
    //         this._hour.updateHour( data ).then( (resp) => {
    //            this.result = true
    //            this.success = "Se han hecho los cambios correctamente"
    //         }).catch( (error) => {
    //            console.log(error)
    //         })
    //
    //     }
    //
    // } else {
    //     this.arrAusent.push("Sábado")
    // }
    //
    //
    // if (this.arrDomingo.length > 0) {
    //
    //     for( var i = 0; i < this.arrDomingo.length ; i++ ){
    //
    //         let data = {
    //           id: this.uid,
    //           dia: 'Domingo',
    //           hora: this.arrDomingo[i]
    //         }
    //
    //         this._hour.updateHour( data ).then( (resp) => {
    //            this.result = true
    //            this.success = "Se han hecho los cambios correctamente"
    //         }).catch( (error) => {
    //            console.log(error)
    //         })
    //
    //     }
    //
    // } else {
    //     this.arrAusent.push("Domingo")
    // }
    //
    // this.updateAusent()

  }

  private remove(arr, item) {
     var i;
     while((i = arr.indexOf(item)) !== -1) {
       arr.splice(i, 1);
     }
  }

  private removeAll(arr) {
     var i, j;
     for(j = 0; j < arr.length; j++){
       while((i = arr.indexOf(arr[j])) !== -1) {
         arr.splice(i, 1);
       }
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

            if ( value == "hora3") {
                if (event) {
                    this.arrLunes.push("8:00 am - 9:00 am")
                } else {
                    this.remove(this.arrLunes, "8:00 am - 9:00 am")
                }
            }

            if ( value == "hora4") {
                if (event) {
                    this.arrLunes.push("9:00 am - 10:00 am")
                } else {
                    this.remove(this.arrLunes, "9:00 am - 10:00 am")
                }
            }

            if ( value == "hora5") {
                if (event) {
                    this.arrLunes.push("10:00 am - 11:00 am")
                } else {
                    this.remove(this.arrLunes, "10:00 am - 11:00 am")
                }
            }

            if ( value == "hora6") {
                if (event) {
                    this.arrLunes.push("11:00 am - 12:00 pm")
                } else {
                    this.remove(this.arrLunes, "11:00 am - 12:00 pm")
                }
            }

            if ( value == "hora7") {
                if (event) {
                    this.arrLunes.push("12:00 pm - 1:00 pm")
                } else {
                    this.remove(this.arrLunes, "12:00 pm - 1:00 pm")
                }
            }

            if ( value == "hora8") {
                if (event) {
                    this.arrLunes.push("1:00 pm - 2:00 pm")
                } else {
                    this.remove(this.arrLunes, "1:00 pm - 2:00 pm")
                }
            }

            if ( value == "hora9") {
                if (event) {
                    this.arrLunes.push("2:00 pm - 3:00 pm")
                } else {
                    this.remove(this.arrLunes, "2:00 pm - 3:00 pm")
                }
            }

            if ( value == "hora10") {
                if (event) {
                    this.arrLunes.push("3:00 pm - 4:00 pm")
                } else {
                    this.remove(this.arrLunes, "3:00 pm - 4:00 pm")
                }
            }

            if ( value == "hora11") {
                if (event) {
                    this.arrLunes.push("4:00 pm - 5:00 pm")
                } else {
                    this.remove(this.arrLunes, "4:00 pm - 5:00 pm")
                }
            }

            if ( value == "hora12") {
                if (event) {
                    this.arrLunes.push("5:00 pm - 6:00 pm")
                } else {
                    this.remove(this.arrLunes, "5:00 pm - 6:00 pm")
                }
            }

            if ( value == "hora13") {
                if (event) {
                    this.arrLunes.push("6:00 pm - 7:00 pm")
                } else {
                    this.remove(this.arrLunes, "6:00 pm - 7:00 pm")
                }
            }

            if ( value == "hora14") {
                if (event) {
                    this.arrLunes.push("7:00 pm - 8:00 pm")
                } else {
                    this.remove(this.arrLunes, "7:00 pm - 8:00 pm")
                }
            }


    }

    if ( this.selectedDay27 == this.diasArr[1] ) {

            if ( value == "hora1") {
                if (event) {
                    this.arrMartes.push("6:00 am - 7:00 am")
                } else {
                    this.remove(this.arrMartes, "6:00 am - 7:00 am")
                }
            }

            if ( value == "hora2") {
                if (event) {
                    this.arrMartes.push("7:00 am - 8:00 am")
                } else {
                    this.remove(this.arrMartes, "7:00 am - 8:00 am")
                }
            }

            if ( value == "hora3") {
                if (event) {
                    this.arrMartes.push("8:00 am - 9:00 am")
                } else {
                    this.remove(this.arrMartes, "8:00 am - 9:00 am")
                }
            }

            if ( value == "hora4") {
                if (event) {
                    this.arrMartes.push("9:00 am - 10:00 am")
                } else {
                    this.remove(this.arrMartes, "9:00 am - 10:00 am")
                }
            }

            if ( value == "hora5") {
                if (event) {
                    this.arrMartes.push("10:00 am - 11:00 am")
                } else {
                    this.remove(this.arrMartes, "10:00 am - 11:00 am")
                }
            }

            if ( value == "hora6") {
                if (event) {
                    this.arrMartes.push("11:00 am - 12:00 pm")
                } else {
                    this.remove(this.arrMartes, "11:00 am - 12:00 pm")
                }
            }

            if ( value == "hora7") {
                if (event) {
                    this.arrMartes.push("12:00 pm - 1:00 pm")
                } else {
                    this.remove(this.arrMartes, "12:00 pm - 1:00 pm")
                }
            }

            if ( value == "hora8") {
                if (event) {
                    this.arrMartes.push("1:00 pm - 2:00 pm")
                } else {
                    this.remove(this.arrMartes, "1:00 pm - 2:00 pm")
                }
            }

            if ( value == "hora9") {
                if (event) {
                    this.arrMartes.push("2:00 pm - 3:00 pm")
                } else {
                    this.remove(this.arrMartes, "2:00 pm - 3:00 pm")
                }
            }

            if ( value == "hora10") {
                if (event) {
                    this.arrMartes.push("3:00 pm - 4:00 pm")
                } else {
                    this.remove(this.arrMartes, "3:00 pm - 4:00 pm")
                }
            }

            if ( value == "hora11") {
                if (event) {
                    this.arrMartes.push("4:00 pm - 5:00 pm")
                } else {
                    this.remove(this.arrMartes, "4:00 pm - 5:00 pm")
                }
            }

            if ( value == "hora12") {
                if (event) {
                    this.arrMartes.push("5:00 pm - 6:00 pm")
                } else {
                    this.remove(this.arrMartes, "5:00 pm - 6:00 pm")
                }
            }

            if ( value == "hora13") {
                if (event) {
                    this.arrMartes.push("6:00 pm - 7:00 pm")
                } else {
                    this.remove(this.arrMartes, "6:00 pm - 7:00 pm")
                }
            }

            if ( value == "hora14") {
                if (event) {
                    this.arrMartes.push("7:00 pm - 8:00 pm")
                } else {
                    this.remove(this.arrMartes, "7:00 pm - 8:00 pm")
                }
            }


    }

    if ( this.selectedDay27 == this.diasArr[2] ) {

            if ( value == "hora1") {
                if (event) {
                    this.arrMiercoles.push("6:00 am - 7:00 am")
                } else {
                    this.remove(this.arrMiercoles, "6:00 am - 7:00 am")
                }
            }

            if ( value == "hora2") {
                if (event) {
                    this.arrMiercoles.push("7:00 am - 8:00 am")
                } else {
                    this.remove(this.arrMiercoles, "7:00 am - 8:00 am")
                }
            }

            if ( value == "hora3") {
                if (event) {
                    this.arrMiercoles.push("8:00 am - 9:00 am")
                } else {
                    this.remove(this.arrMiercoles, "8:00 am - 9:00 am")
                }
            }

            if ( value == "hora4") {
                if (event) {
                    this.arrMiercoles.push("9:00 am - 10:00 am")
                } else {
                    this.remove(this.arrMiercoles, "9:00 am - 10:00 am")
                }
            }

            if ( value == "hora5") {
                if (event) {
                    this.arrMiercoles.push("10:00 am - 11:00 am")
                } else {
                    this.remove(this.arrMiercoles, "10:00 am - 11:00 am")
                }
            }

            if ( value == "hora6") {
                if (event) {
                    this.arrMiercoles.push("11:00 am - 12:00 pm")
                } else {
                    this.remove(this.arrMiercoles, "11:00 am - 12:00 pm")
                }
            }

            if ( value == "hora7") {
                if (event) {
                    this.arrMiercoles.push("12:00 pm - 1:00 pm")
                } else {
                    this.remove(this.arrMiercoles, "12:00 pm - 1:00 pm")
                }
            }

            if ( value == "hora8") {
                if (event) {
                    this.arrMiercoles.push("1:00 pm - 2:00 pm")
                } else {
                    this.remove(this.arrMiercoles, "1:00 pm - 2:00 pm")
                }
            }

            if ( value == "hora9") {
                if (event) {
                    this.arrMiercoles.push("2:00 pm - 3:00 pm")
                } else {
                    this.remove(this.arrMiercoles, "2:00 pm - 3:00 pm")
                }
            }

            if ( value == "hora10") {
                if (event) {
                    this.arrMiercoles.push("3:00 pm - 4:00 pm")
                } else {
                    this.remove(this.arrMiercoles, "3:00 pm - 4:00 pm")
                }
            }

            if ( value == "hora11") {
                if (event) {
                    this.arrMiercoles.push("4:00 pm - 5:00 pm")
                } else {
                    this.remove(this.arrMiercoles, "4:00 pm - 5:00 pm")
                }
            }

            if ( value == "hora12") {
                if (event) {
                    this.arrMiercoles.push("5:00 pm - 6:00 pm")
                } else {
                    this.remove(this.arrMiercoles, "5:00 pm - 6:00 pm")
                }
            }

            if ( value == "hora13") {
                if (event) {
                    this.arrMiercoles.push("6:00 pm - 7:00 pm")
                } else {
                    this.remove(this.arrMiercoles, "6:00 pm - 7:00 pm")
                }
            }

            if ( value == "hora14") {
                if (event) {
                    this.arrMiercoles.push("7:00 pm - 8:00 pm")
                } else {
                    this.remove(this.arrMiercoles, "7:00 pm - 8:00 pm")
                }
            }


    }

    if ( this.selectedDay27 == this.diasArr[3] ) {

            if ( value == "hora1") {
                if (event) {
                    this.arrJuevez.push("6:00 am - 7:00 am")
                } else {
                    this.remove(this.arrJuevez, "6:00 am - 7:00 am")
                }
            }

            if ( value == "hora2") {
                if (event) {
                    this.arrJuevez.push("7:00 am - 8:00 am")
                } else {
                    this.remove(this.arrJuevez, "7:00 am - 8:00 am")
                }
            }

            if ( value == "hora3") {
                if (event) {
                    this.arrJuevez.push("8:00 am - 9:00 am")
                } else {
                    this.remove(this.arrJuevez, "8:00 am - 9:00 am")
                }
            }

            if ( value == "hora4") {
                if (event) {
                    this.arrJuevez.push("9:00 am - 10:00 am")
                } else {
                    this.remove(this.arrJuevez, "9:00 am - 10:00 am")
                }
            }

            if ( value == "hora5") {
                if (event) {
                    this.arrJuevez.push("10:00 am - 11:00 am")
                } else {
                    this.remove(this.arrJuevez, "10:00 am - 11:00 am")
                }
            }

            if ( value == "hora6") {
                if (event) {
                    this.arrJuevez.push("11:00 am - 12:00 pm")
                } else {
                    this.remove(this.arrJuevez, "11:00 am - 12:00 pm")
                }
            }

            if ( value == "hora7") {
                if (event) {
                    this.arrJuevez.push("12:00 pm - 1:00 pm")
                } else {
                    this.remove(this.arrJuevez, "12:00 pm - 1:00 pm")
                }
            }

            if ( value == "hora8") {
                if (event) {
                    this.arrJuevez.push("1:00 pm - 2:00 pm")
                } else {
                    this.remove(this.arrJuevez, "1:00 pm - 2:00 pm")
                }
            }

            if ( value == "hora9") {
                if (event) {
                    this.arrJuevez.push("2:00 pm - 3:00 pm")
                } else {
                    this.remove(this.arrJuevez, "2:00 pm - 3:00 pm")
                }
            }

            if ( value == "hora10") {
                if (event) {
                    this.arrJuevez.push("3:00 pm - 4:00 pm")
                } else {
                    this.remove(this.arrJuevez, "3:00 pm - 4:00 pm")
                }
            }

            if ( value == "hora11") {
                if (event) {
                    this.arrJuevez.push("4:00 pm - 5:00 pm")
                } else {
                    this.remove(this.arrJuevez, "4:00 pm - 5:00 pm")
                }
            }

            if ( value == "hora12") {
                if (event) {
                    this.arrJuevez.push("5:00 pm - 6:00 pm")
                } else {
                    this.remove(this.arrJuevez, "5:00 pm - 6:00 pm")
                }
            }

            if ( value == "hora13") {
                if (event) {
                    this.arrJuevez.push("6:00 pm - 7:00 pm")
                } else {
                    this.remove(this.arrJuevez, "6:00 pm - 7:00 pm")
                }
            }

            if ( value == "hora14") {
                if (event) {
                    this.arrJuevez.push("7:00 pm - 8:00 pm")
                } else {
                    this.remove(this.arrJuevez, "7:00 pm - 8:00 pm")
                }
            }


    }

    if ( this.selectedDay27 == this.diasArr[4] ) {

            if ( value == "hora1") {
                if (event) {
                    this.arrViernes.push("6:00 am - 7:00 am")
                } else {
                    this.remove(this.arrViernes, "6:00 am - 7:00 am")
                }
            }

            if ( value == "hora2") {
                if (event) {
                    this.arrViernes.push("7:00 am - 8:00 am")
                } else {
                    this.remove(this.arrViernes, "7:00 am - 8:00 am")
                }
            }

            if ( value == "hora3") {
                if (event) {
                    this.arrViernes.push("8:00 am - 9:00 am")
                } else {
                    this.remove(this.arrViernes, "8:00 am - 9:00 am")
                }
            }

            if ( value == "hora4") {
                if (event) {
                    this.arrViernes.push("9:00 am - 10:00 am")
                } else {
                    this.remove(this.arrViernes, "9:00 am - 10:00 am")
                }
            }

            if ( value == "hora5") {
                if (event) {
                    this.arrViernes.push("10:00 am - 11:00 am")
                } else {
                    this.remove(this.arrViernes, "10:00 am - 11:00 am")
                }
            }

            if ( value == "hora6") {
                if (event) {
                    this.arrViernes.push("11:00 am - 12:00 pm")
                } else {
                    this.remove(this.arrViernes, "11:00 am - 12:00 pm")
                }
            }

            if ( value == "hora7") {
                if (event) {
                    this.arrViernes.push("12:00 pm - 1:00 pm")
                } else {
                    this.remove(this.arrViernes, "12:00 pm - 1:00 pm")
                }
            }

            if ( value == "hora8") {
                if (event) {
                    this.arrViernes.push("1:00 pm - 2:00 pm")
                } else {
                    this.remove(this.arrViernes, "1:00 pm - 2:00 pm")
                }
            }

            if ( value == "hora9") {
                if (event) {
                    this.arrViernes.push("2:00 pm - 3:00 pm")
                } else {
                    this.remove(this.arrViernes, "2:00 pm - 3:00 pm")
                }
            }

            if ( value == "hora10") {
                if (event) {
                    this.arrViernes.push("3:00 pm - 4:00 pm")
                } else {
                    this.remove(this.arrViernes, "3:00 pm - 4:00 pm")
                }
            }

            if ( value == "hora11") {
                if (event) {
                    this.arrViernes.push("4:00 pm - 5:00 pm")
                } else {
                    this.remove(this.arrViernes, "4:00 pm - 5:00 pm")
                }
            }

            if ( value == "hora12") {
                if (event) {
                    this.arrViernes.push("5:00 pm - 6:00 pm")
                } else {
                    this.remove(this.arrViernes, "5:00 pm - 6:00 pm")
                }
            }

            if ( value == "hora13") {
                if (event) {
                    this.arrViernes.push("6:00 pm - 7:00 pm")
                } else {
                    this.remove(this.arrViernes, "6:00 pm - 7:00 pm")
                }
            }

            if ( value == "hora14") {
                if (event) {
                    this.arrViernes.push("7:00 pm - 8:00 pm")
                } else {
                    this.remove(this.arrViernes, "7:00 pm - 8:00 pm")
                }
            }


    }

    if ( this.selectedDay27 == this.diasArr[5] ) {

            if ( value == "hora1") {
                if (event) {
                    this.arrSabado.push("6:00 am - 7:00 am")
                } else {
                    this.remove(this.arrSabado, "6:00 am - 7:00 am")
                }
            }

            if ( value == "hora2") {
                if (event) {
                    this.arrSabado.push("7:00 am - 8:00 am")
                } else {
                    this.remove(this.arrSabado, "7:00 am - 8:00 am")
                }
            }

            if ( value == "hora3") {
                if (event) {
                    this.arrSabado.push("8:00 am - 9:00 am")
                } else {
                    this.remove(this.arrSabado, "8:00 am - 9:00 am")
                }
            }

            if ( value == "hora4") {
                if (event) {
                    this.arrSabado.push("9:00 am - 10:00 am")
                } else {
                    this.remove(this.arrSabado, "9:00 am - 10:00 am")
                }
            }

            if ( value == "hora5") {
                if (event) {
                    this.arrSabado.push("10:00 am - 11:00 am")
                } else {
                    this.remove(this.arrSabado, "10:00 am - 11:00 am")
                }
            }

            if ( value == "hora6") {
                if (event) {
                    this.arrSabado.push("11:00 am - 12:00 pm")
                } else {
                    this.remove(this.arrSabado, "11:00 am - 12:00 pm")
                }
            }

            if ( value == "hora7") {
                if (event) {
                    this.arrSabado.push("12:00 pm - 1:00 pm")
                } else {
                    this.remove(this.arrSabado, "12:00 pm - 1:00 pm")
                }
            }

            if ( value == "hora8") {
                if (event) {
                    this.arrSabado.push("1:00 pm - 2:00 pm")
                } else {
                    this.remove(this.arrSabado, "1:00 pm - 2:00 pm")
                }
            }

            if ( value == "hora9") {
                if (event) {
                    this.arrSabado.push("2:00 pm - 3:00 pm")
                } else {
                    this.remove(this.arrSabado, "2:00 pm - 3:00 pm")
                }
            }

            if ( value == "hora10") {
                if (event) {
                    this.arrSabado.push("3:00 pm - 4:00 pm")
                } else {
                    this.remove(this.arrSabado, "3:00 pm - 4:00 pm")
                }
            }

            if ( value == "hora11") {
                if (event) {
                    this.arrSabado.push("4:00 pm - 5:00 pm")
                } else {
                    this.remove(this.arrSabado, "4:00 pm - 5:00 pm")
                }
            }

            if ( value == "hora12") {
                if (event) {
                    this.arrSabado.push("5:00 pm - 6:00 pm")
                } else {
                    this.remove(this.arrSabado, "5:00 pm - 6:00 pm")
                }
            }

            if ( value == "hora13") {
                if (event) {
                    this.arrSabado.push("6:00 pm - 7:00 pm")
                } else {
                    this.remove(this.arrSabado, "6:00 pm - 7:00 pm")
                }
            }

            if ( value == "hora14") {
                if (event) {
                    this.arrSabado.push("7:00 pm - 8:00 pm")
                } else {
                    this.remove(this.arrSabado, "7:00 pm - 8:00 pm")
                }
            }


    }

    if ( this.selectedDay27 == this.diasArr[6] ) {

            if ( value == "hora1") {
                if (event) {
                    this.arrDomingo.push("6:00 am - 7:00 am")
                } else {
                    this.remove(this.arrDomingo, "6:00 am - 7:00 am")
                }
            }

            if ( value == "hora2") {
                if (event) {
                    this.arrDomingo.push("7:00 am - 8:00 am")
                } else {
                    this.remove(this.arrDomingo, "7:00 am - 8:00 am")
                }
            }

            if ( value == "hora3") {
                if (event) {
                    this.arrDomingo.push("8:00 am - 9:00 am")
                } else {
                    this.remove(this.arrDomingo, "8:00 am - 9:00 am")
                }
            }

            if ( value == "hora4") {
                if (event) {
                    this.arrDomingo.push("9:00 am - 10:00 am")
                } else {
                    this.remove(this.arrDomingo, "9:00 am - 10:00 am")
                }
            }

            if ( value == "hora5") {
                if (event) {
                    this.arrDomingo.push("10:00 am - 11:00 am")
                } else {
                    this.remove(this.arrDomingo, "10:00 am - 11:00 am")
                }
            }

            if ( value == "hora6") {
                if (event) {
                    this.arrDomingo.push("11:00 am - 12:00 pm")
                } else {
                    this.remove(this.arrDomingo, "11:00 am - 12:00 pm")
                }
            }

            if ( value == "hora7") {
                if (event) {
                    this.arrDomingo.push("12:00 pm - 1:00 pm")
                } else {
                    this.remove(this.arrDomingo, "12:00 pm - 1:00 pm")
                }
            }

            if ( value == "hora8") {
                if (event) {
                    this.arrDomingo.push("1:00 pm - 2:00 pm")
                } else {
                    this.remove(this.arrDomingo, "1:00 pm - 2:00 pm")
                }
            }

            if ( value == "hora9") {
                if (event) {
                    this.arrDomingo.push("2:00 pm - 3:00 pm")
                } else {
                    this.remove(this.arrDomingo, "2:00 pm - 3:00 pm")
                }
            }

            if ( value == "hora10") {
                if (event) {
                    this.arrDomingo.push("3:00 pm - 4:00 pm")
                } else {
                    this.remove(this.arrDomingo, "3:00 pm - 4:00 pm")
                }
            }

            if ( value == "hora11") {
                if (event) {
                    this.arrDomingo.push("4:00 pm - 5:00 pm")
                } else {
                    this.remove(this.arrDomingo, "4:00 pm - 5:00 pm")
                }
            }

            if ( value == "hora12") {
                if (event) {
                    this.arrDomingo.push("5:00 pm - 6:00 pm")
                } else {
                    this.remove(this.arrDomingo, "5:00 pm - 6:00 pm")
                }
            }

            if ( value == "hora13") {
                if (event) {
                    this.arrDomingo.push("6:00 pm - 7:00 pm")
                } else {
                    this.remove(this.arrDomingo, "6:00 pm - 7:00 pm")
                }
            }

            if ( value == "hora14") {
                if (event) {
                    this.arrDomingo.push("7:00 pm - 8:00 pm")
                } else {
                    this.remove(this.arrDomingo, "7:00 pm - 8:00 pm")
                }
            }


    }

  }


}
