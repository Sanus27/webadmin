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
      console.log(user)
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
      user.id.delete().then(function() {
        this._db.collection("usuarios").doc( user.id ).delete().then( () =>{
          return "success"
        })
      }).catch(function(error) {
        // An error happened.
      });
    }

    public update(user) {
      this._db.collection("usuarios").doc( user.id ).update({
        apellido: user.lastname,
        nombre: user.name,
      }).then( () =>{
        return "success"
      })
    }


}
