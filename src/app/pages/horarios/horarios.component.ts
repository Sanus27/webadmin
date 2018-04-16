import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { Auth_Service } from '../../services/auth_service';
import { LocalStorageService } from '../../services/localstorage.service';
import { HospitalesService } from '../../services/hospitales.service';
import { Hospitales } from '../../models/Hospitales';

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
  private hospitales: Hospitales[] = [];
  private users = { nombre:'', direccion: '' };

  constructor( private _router:Router, private _auth:Auth_Service,  public _user:HospitalesService, private _sesion:LocalStorageService ) {
    this.uid = this._sesion.cargarSesion();
    this.success = ""
    this.result = false
    this.err = false
    this.error = ""
  }

  ngOnInit() {
    let uid = this.uid;
    if( uid ){
        this._auth.showUser(uid).valueChanges().subscribe( resp =>{

            let dataUser = resp;
            if(dataUser["tipo"] != "Admin"){

              this._router.navigate(["/login"])

            } else {

              this._user.getHospitals().subscribe( (hospitales: Hospitales[]) => {
                  this.hospitales = hospitales
              })

            }

        })
    } else {
      this._router.navigate(["/login"])
    }

  }


  private showModal( id, user ){
    if( id == 1){
      this.updated = false;
      this.users = {
        nombre: undefined,
        direccion: undefined
      }
    }
    if( id == 2){
      this.updated = true;
      this.uid = user.id;
      this.users = {
        nombre: user.nombre,
        direccion: user.direccion
      }

    }
    this.success = ""
    this.result = false
    $('#modal').modal('show');
  }

  private showDelete( user ){
    this.uid = user;
    $('#eliminarUsuario').modal('show');
  }

  private createUser(){
      this.err = false
      this._user.addHospital( this.users ).then( (result) => {
        this.result = true
        this.success = "Se ha registrado el hospital correctamente"
      }).catch( (err) => {
        console.log("error de usuario en db: ", err)
      })
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

  private updateUser(){
    this.err = false
    this.result = false
    this._user.update( this.uid, this.users ).then( (resp) => {
      this.result = true
      this.success = "Se han hecho los cambios correctamente"
    }).catch( (error) => {
      this.err = true
      this.error = "Se ha producido un error, intentalo mas tarde"
    })
  }

}
