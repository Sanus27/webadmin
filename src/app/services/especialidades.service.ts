import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore,  AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Especialidades } from '../models/Especialidades';

@Injectable()
export class EspecialidadesService {

  especialidadcollection: AngularFirestoreCollection<Especialidades>;
  hospitales: Observable<Especialidades[]>;
  userDoc: AngularFirestoreDocument<Especialidades>;
  private resp:string

  constructor( public _db: AngularFirestore, public _auth:AngularFireAuth ) {
    this.resp = "success"
    this.especialidadcollection = this._db.collection('especialidades');
  }

  public updateEspecialidad( uid, user ) {
    return this._db.collection("especialidades").doc( uid ).update({
      nombre: user.nombre
    })
  }

  public deleteEspecialidad( user ) {
    let uid:string = user.id;
    return this._db.collection("especialidades").doc( uid ).delete()
  }

  public createEspecialidad( user ) {
    return this.especialidadcollection.add(user);
  }



}
