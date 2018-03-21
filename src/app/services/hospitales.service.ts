import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class HospitalesService {

  constructor( public _router:Router, public _db:AngularFirestore, public _auth:AngularFireAuth ) {

  }


}
