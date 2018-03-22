import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore,  AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Doctores } from '../models/Doctores';


@Injectable()
export class DoctoresService {

    userscollection: AngularFirestoreCollection<Doctores>;
    docscollection: AngularFirestoreCollection<Doctores>;
    users: Observable<Doctores[]>;
    userDoc: AngularFirestoreDocument<Doctores>;
    private resp:string

    constructor( public _db: AngularFirestore, public _auth:AngularFireAuth ) {
      this.resp = "success"
      this.userscollection = this._db.collection('usuarios');
      this.docscollection = this._db.collection('doctores');
      this.users = this.userscollection.snapshotChanges().map(
        changes => { return changes.map( a => {
            const data = a.payload.doc.data() as Doctores;
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
    }

    public addUser(uid, user){
      return this.userscollection.doc( uid ).set({
        apellido: user.lastname,
        nombre: user.name,
        estado: "0",
        tipo: "Medico"
      })
    }

    public addDoctor(uid, user){
      return this.docscollection.doc( uid ).set({
        calificacion: '0',
        cedula: user.cedula,
        comentario: '0',
        cv: '',
        especialidad: user.especialidad
      })
    }


    public deleteUser( user ) {
      let uid:string = user.id
      return this._db.collection("usuarios").doc( uid ).delete()
    }

    public updateDoctor( user ) {
      let uid:string = user.id
      return this._db.collection("usuarios").doc( uid ).update({
        apellido: user.apellido,
        nombre: user.nombre,
      })
    }


}
