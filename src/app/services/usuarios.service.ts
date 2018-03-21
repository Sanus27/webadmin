import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Usuarios } from '../models/Usuarios';

@Injectable()
export class UsuariosService {

  constructor( public _router:Router, public _db:AngularFirestore, public _auth:AngularFireAuth ) {

  }

  public createUser( email, password ){
    return this._auth.auth.createUserWithEmailAndPassword( email, password);
  }

  public createAdmin( uid, name, lastname ){
    let data = {
      apellido: lastname,
      nombre: name,
      tipo: "Admin",
      estado: "0"
    }
    return this._db.collection("usuarios").doc(uid).set(data);
  }

  public update( uid, name, lastname ){
    this._db.collection("usuarios").doc( uid ).update({
      apellido: lastname,
      nombre: name,
    }).then( () =>{
      return "success"
    })
  }

  public delete( uid ){
    this._db.collection("usuarios").doc( uid ).delete().then( () =>{
      return "success"
    })
  }


}
