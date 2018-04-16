import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore,  AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Hospitales } from '../models/Hospitales';


@Injectable()
export class HospitalesService {

    hospitalesscollection: AngularFirestoreCollection<Hospitales>;
    hospitales: Observable<Hospitales[]>;
    userDoc: AngularFirestoreDocument<Hospitales>;
    private resp:string

    constructor( public _db: AngularFirestore, public _auth:AngularFireAuth ) {
      this.resp = "success"
      this.hospitalesscollection = this._db.collection('hospitales');
      this.hospitales = this.hospitalesscollection.snapshotChanges().map(
        changes => { return changes.map( a => {
            const data = a.payload.doc.data() as Hospitales;
            data.id = a.payload.doc.id;
            return data;
        });
      });

    }

    public getHospitals() {
      return this.hospitales;
    }


    public createUser(user) {
      return this._auth.auth.createUserWithEmailAndPassword( user.email, user.password);
    }

    public addUser(uid, user){
      return this.hospitalesscollection.doc( uid ).set({
        apellido: user.lastname,
        nombre: user.name,
        estado: "0",
        tipo: "Admin"
      })
    }


    public deleteUser( user ) {
      let uid:string = user.id;
      return this._db.collection("usuarios").doc( uid ).update({
        estado: "eliminado",
      })
      // let uid:string = user.id
      // return this._db.collection("usuarios").doc( uid ).delete()
    }

    public update( id, user ) {
      return this._db.collection("usuarios").doc( id ).update({
        apellido: user.lastname,
        nombre: user.name,
      })
    }



}
