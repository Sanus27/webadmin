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
  private result:boolean;
  private error:string;
  private success:string;
  private uid:any;
  private updated:boolean;
  private arr: any;
  private days = { Lunes:'', Martes: '', Miercoles: '', Jueves: '', Viernes: '', Sabado: '', Domingo: '' };
  private hours = { hora1:'', hora2: '', hora3: '', hora4: '', hora5: '', hora6: '', hora7: '', hora8: '', hora9: '', hora10: '', hora11: '', hora12: '', hora13: '', hora14: '' };

  private doctorcollection: AngularFirestoreCollection<Doctores>;
  private Lunes:string = "1";
  private Martes:string = "1";
  private Miercoles:string = "1";
  private Jueves:string = "1";
  private Viernes:string = "1";
  private Sabado:string = "1";
  private Domingo:string = "1";
  private diasArr = [ "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo" ]

  constructor( private _router:Router, private _auth:Auth_Service,  public _user: DoctoresService, private _sesion:LocalStorageService, public _db: AngularFirestore, private _hour:HorariosService ) {
    this.uid = this._sesion.cargarSesion();
    this.success = ""
    this.result = false
    this.err = false
    this.error = ""
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
          hora14: undefined,
      }
      $('#modal').modal('show');
  }

  private editDoctor( user ){
    this.updated = true;
    this.uid = user.id;
    this._hour.getHorarios( this.uid ).subscribe( data => {

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

        this.hours = {
            hora1: "1",
            hora2: "1",
            hora3: "1",
            hora4: "1",
            hora5: "1",
            hora6: "1",
            hora7: "1",
            hora8: "1",
            hora9: "1",
            hora10: "1",
            hora11: "1",
            hora12: "1",
            hora13: "1",
            hora14: "1",
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


  private showDelete( user ){
    this.uid = user;
    console.log( this.uid );
    $('#eliminarUsuario').modal('show');
  }

  private createUser(){
    this.err = false
    // this._user.createUser(this.users).then( (data => {
    //   let uid = data.uid
    //
    //   this._user.addUser( uid, this.users ).then( (result) => {
    //
    //       this._user.addDoctor( uid, this.doctors ).then( (result) => {
    //         this.result = true
    //         this.success = "Se ha registrado el usuario correctamente"
    //       }).catch( (err) => {
    //         console.log("error de usuario en db: ", err)
    //       })
    //
    //   }).catch( (err) => {
    //     console.log("error de usuario en db: ", err)
    //   })
    //
    // })).catch( (error) => {
    //   if (error.code == "auth/invalid-email") {
    //     this.err = true
    //     this.error = "Este no es un correo valido"
    //     console.log("auth/invalid-email")
    //   }
    //   if (error.code == "auth/email-already-in-use") {
    //     this.err = true
    //     this.error = "Este correo ya tiene una cuenta"
    //     console.log("auth/email-already-in-use")
    //   }
    //   console.log("error de autenticacion: ", error)
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
    // this._user.update( this.uid, this.users ).then( (resp) => {
    //   this.result = true
    //   this.success = "Se han hecho los cambios correctamente"
    // }).catch( (error) => {
    //   this.err = true
    //   this.error = "Se ha producido un error, intentalo mas tarde"
    // })
  }



}
