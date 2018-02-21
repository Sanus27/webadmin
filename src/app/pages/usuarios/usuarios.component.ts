import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { Auth_Service } from '../../services/auth_service';
import { LocalStorage_Service } from '../../services/localstorage_service';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
})
export class UsuariosComponent implements OnInit {

  public uid:any;
  public listUser: Observable<any[]>;
  constructor( public _router:Router, public _auth:Auth_Service, public _sesion:LocalStorage_Service, public _user:UsuariosService, public _db:AngularFirestore ) {
    this.uid = this._sesion.cargarSesion();
    this.listUser = this._db.collection('usuarios').valueChanges()
  }

  public users:object = {
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

  public createUser(){
    let name = this.users["name"];
    let lastname = this.users["lastname"];
    let email = this.users["email"];
    let password = "Sanus27";
    this._user.createUser( email, password ).then( resp => {
      console.log("resp");
      let id = resp.uid;
      this._user.createAdmin( id, name, lastname).then( data => {

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

  public getUser( uid:string ){
    let infoUser = this._db.collection("usuarios").doc(uid)
    console.log(infoUser);
  }

}
