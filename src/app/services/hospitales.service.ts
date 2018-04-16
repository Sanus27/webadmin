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

    


}
