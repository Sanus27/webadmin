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
    private arr: Usuarios[] = [];
    private users = { lastname: '', name: '', email: '', password: 'Sanus27' };

    constructor( private _router:Router, private _auth:Auth_Service,  public _user: UsuariosService, private _sesion:LocalStorageService ) {
      this.uid = this._sesion.cargarSesion();
    }

    ngOnInit() {

      let uid = this._sesion.cargarSesion();
      if( uid){
          this._auth.showUser(uid).valueChanges().subscribe( resp =>{
              let dataUser = resp;
              if(dataUser["tipo"] != "Admin"){
                this._router.navigate(["/login"]);
              } else {

                this._user.getUsers().subscribe(
                  (user: Usuarios[]) => {
                    this.arr = user;
                  }
                );

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
          email: undefined,
          password: 'Sanus27',
        }

      }
      $('#modal').modal('show');
    }

    private showDelete( user ){
      this.uid = user;
      $('#eliminarUsuario').modal('show');
    }

    private createUser(){
      let createUsr = this._user.createUser(this.users);
      //console.log(createUsr)
      //this.users.lastname = '';
      //this.users.name = '';
      //this.users.email = '';
    }

    private delete(){
      $('#eliminarUsuario').modal('hide');
      this._user.deleteUser( this.uid );
    }

    private updateUser(){
      console.log("modificando...");
      let name = this.users["name"];
      let lastname = this.users["lastname"];
      this._user.update( this.uid )
      $('#modal').modal('hide');
    }



}
