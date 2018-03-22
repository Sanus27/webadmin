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
    private resp:string
    constructor( public _db: AngularFirestore, public _auth:AngularFireAuth ) {
      this.resp = "success"
      this.userscollection = this._db.collection('usuarios');
      this.users = this.userscollection.snapshotChanges().map(
        changes => { return changes.map( a => {
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

      return this._auth.auth.createUserWithEmailAndPassword( user.email, user.password);
      // .then( (data => {
      //     let uid = data.uid
      //
      //     this.userscollection.doc( uid ).set({
      //       apellido: user.lastname,
      //       nombre: user.name,
      //       estado: "0",
      //       tipo: "Admin",
      //     }).then( (result) => {
      //       console.log("success de usuario en db")
      //       return result
      //     }).catch( (err) => {
      //       console.log("error de usuario en db")
      //       return err
      //     })
      //
      // })).catch( (error) => {
      //   console.log("error de autenticacion:" + error)
      //   return error
      // })

    }

    public addUser(uid, user){
      return this.userscollection.doc( uid ).set({
        apellido: user.lastname,
        nombre: user.name,
        estado: "0",
        tipo: "Admin"
      })
      // .then( (result) => {
      //   console.log("success de usuario en db")
      //   return result
      // }).catch( (err) => {
      //   console.log("error de usuario en db")
      //   return err
      // })
    }


    public deleteUser( user ) {

      let uid:string = user.id
      return this._db.collection("usuarios").doc( uid ).delete()
      // .then( () =>{
      //
      // })

    }

    public update( id, user ) {

      return this._db.collection("usuarios").doc( id ).update({
        apellido: user.lastname,
        nombre: user.name,
      })


      //  .then( () =>{
      //   console.log( "simon" )
      // })
    }


}
