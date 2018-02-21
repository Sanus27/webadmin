import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

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
      tipo: "Admin"
    }
    return this._db.collection("usuarios").doc(uid).set(data);
  }
  

}
