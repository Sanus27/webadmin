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
    this.hospitales = this.especialidadcollection.snapshotChanges().map(
      changes => { return changes.map( a => {
          const data = a.payload.doc.data() as Especialidades;
          data.id = a.payload.doc.id;
          return data;
      });
    });

  }

  public getEspecialidades() {
    return this.hospitales;
  }

}
