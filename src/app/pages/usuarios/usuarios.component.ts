import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { Auth_Service } from '../../services/auth_service';
import { LocalStorageService } from '../../services/localstorage.service';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuarios } from '../../models/Usuarios';

declare var $:any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
})
export class UsuariosComponent implements OnInit {

  private uid:any;
  private updated:boolean;
  private listUser: Observable<Usuarios[]>;
  constructor( private _router:Router, private _auth:Auth_Service, private _sesion:LocalStorageService, private _user:UsuariosService, private _db:AngularFirestore ) {
    this.uid = this._sesion.cargarSesion();
    this.listUser = this._db.collection('usuarios').valueChanges()
  }

  private users:object = {
    name: undefined,
    lastname: undefined,
    email: undefined
  }

  ngOnInit() {

    let uid = this._sesion.cargarSesion();
    if( uid){
      this._auth.showUser(uid).valueChanges().subscribe( resp =>{
        let dataUser = resp;
        if(dataUser["tipo"] != "Admin"){
          this._router.navigate(["/login"]);
        }
      })
    } else {
      this._router.navigate(["/login"]);
    }

  }

  private showModal( id, user ){
    if( id == 1){
      this.updated = false;
    }
    if( id == 2){
      this.updated = true;
      this.users = {
        name: user.nombre,
        lastname: user.apellido,
        email: undefined
      }

    }
    $('#modal').modal('show');
  }

  private showDelete( user ){
    this.uid = user;
    $('#eliminarUsuario').modal('show');
  }

  private delete(){
    $('#eliminarUsuario').modal('hide');
    this._user.delete( "gof9o1wAyuar47uW3WTMUOzBtQo2" )
  }

  private updateUser(){
    console.log("modificando...");
    let name = this.users["name"];
    let lastname = this.users["lastname"];
    this._user.update( "gof9o1wAyuar47uW3WTMUOzBtQo2",  name, lastname )
    $('#modal').modal('hide');
  }

  private createUser(){
    let name = this.users["name"];
    let lastname = this.users["lastname"];
    let email = this.users["email"];
    let password = "Sanus27";
    this._user.createUser( email, password ).then( resp => {
      console.log("resp");
      let id = resp.uid;
      this._user.createAdmin( id, name, lastname).then( data => {
        $('#modal').modal('hide');
      }).catch( err => {
        console.log("err");
        console.log(err);
      })
    }).catch( error => {
      if(error.code == "auth/email-already-in-use"){

      }
      if(error.code == "auth/invalid-email"){

      }
      console.log("error");
      console.log(error);
    })
  }



}
