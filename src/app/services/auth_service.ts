import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class Auth_Service {

  public usuario: any = {};
  public userInfo:any[] = [];
  constructor( private _db: AngularFirestore, public _auth: AngularFireAuth ) {
    this.stateUser();
  }

  public stateUser(){
    this._auth.authState.subscribe( user => {

      if( !user ){
        return;
      }
      this.usuario.uid = user.uid;

    })
  }

  public showUser( uid ){
    let path = `/usuarios/${uid}`;
    return this._db.doc(path);
  }

  public getInfoUser(){
      this.showUser( this.usuario.uid ).valueChanges().subscribe( data => {
        this.userInfo.push( data );
        return this.userInfo;
      });
  }

  public login( email:string, password:string ){
    this.getInfoUser();
    return this._auth.auth.signInWithEmailAndPassword( email, password );
  }

  public signOut(){
    this.usuario = {};
    this._auth.auth.signOut();
  }

}
