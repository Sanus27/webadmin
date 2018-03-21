import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore,  AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Usuarios } from '../models/Usuarios';


@Injectable()
export class UsuariosService {

    userscollection: AngularFirestoreCollection<Usuarios>;
    users: Observable<Usuarios[]>;
    userDoc: AngularFirestoreDocument<Usuarios>;

    constructor( public _db: AngularFirestore, public _auth:AngularFireAuth ) {

      this.userscollection = this._db.collection('usuarios');
      this.users = this.userscollection.snapshotChanges().map(
        changes => {
          return changes.map(
            a => {
              const data = a.payload.doc.data() as Usuarios;
              data.id = a.payload.doc.id;
              return data;
            });

        });

    }

    public getUsers() {
      return this.users;
    }

    public createUser(user) {

      this._auth.auth.createUserWithEmailAndPassword( user.email, user.password).then( (resp => {
          let uid = resp.uid

          this.userscollection.doc( uid ).set({
            apellido: user.lastname,
            nombre: user.name,
            estado: "0",
            tipo: "Admin",
          }).catch( (error) => {

          })

      }))

    }

    public deleteUser( user ) {
      let uid:string = user.id
      console.log( uid )
      this._db.collection("usuarios").doc( uid ).delete().then( () =>{

      })

    }

    public update( id, name, lastname ) {
      this._db.collection("usuarios").doc( id ).update({
        apellido: lastname,
        nombre: name,
      }).then( () =>{
        console.log( "simon" )
      })
    }


}
