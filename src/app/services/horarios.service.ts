import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore,  AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Usuarios } from '../models/Usuarios';
import { Doctores } from '../models/Doctores';

@Injectable()
export class HorariosService {

  horarioscollection: AngularFirestoreCollection<Usuarios>;
  users: Observable<Usuarios[]>;
  userDoc: AngularFirestoreDocument<Usuarios>;
  private resp:string;

  constructor( public _db: AngularFirestore, public _auth:AngularFireAuth ) {
    this.resp = "success"
    this.horarioscollection = this._db.collection('horarios');
    this.users = this.horarioscollection.snapshotChanges().map(
      changes => { return changes.map( a => {
          const data = a.payload.doc.data() as Usuarios;
          data.id = a.payload.doc.id;
          return data;
      });
    });

  }

  public getHours( uid ) {
    return this.users
  }

  public addHour(user){
    let uid:string = user.id;
    return this.horarioscollection.doc( uid ).set({
      avatar: "userDefaults.png",
      apellido: user.lastname,
      nombre: user.name,
      estado: "0",
      tipo: "Medico"
    })
  }

  public deleteHour( user ) {
    let uid:string = user.id;
    return this.horarioscollection.doc( uid ).delete()
  }

  public updateHour( id, user ) {
    return this.horarioscollection.doc( id ).update({
      apellido: user.lastname,
      nombre: user.name,
    })
  }




}
