import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore,  AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Usuarios } from '../models/Usuarios';
import { Doctores } from '../models/Doctores';
import { Horarios } from '../models/Horarios';

@Injectable()
export class HorariosService {

  horarioscollection: AngularFirestoreCollection<Horarios>;
  diascollection: AngularFirestoreCollection<Horarios>;
  users: Observable<Horarios[]>;
  days: Observable<Horarios[]>;
  userDoc: AngularFirestoreDocument<Usuarios>;
  private resp:string;
  public horarios:any[];
  public dias:any[];

  constructor( public _db: AngularFirestore, public _auth:AngularFireAuth ) {
    this.resp = "success"
    this.horarioscollection = this._db.collection('horarios');
    this.diascollection = this._db.collection('horarios');
  }


  public getDays( uid ) {
    return this.getDaysById( uid ).map( data => {
        for( var i = 0; i <= data.length - 1; i ++ ){
            if ( data[i] != undefined ){
                this.dias = data[i]["dias"]
            }
        }
    })
  }

  public getDaysById( uid ){
    return this.days = this.diascollection.snapshotChanges().map(
      changes => { return changes.map( a => {
          const data = a.payload.doc.data() as Horarios;
          data.id = a.payload.doc.id;
          if ( data.id == uid ) {
            return data;
          }
      });
    });
  }



  public getHorarios( uid, dia ) {
    this.horarios = []
    return this.getHorsById( uid, dia ).map( data => {
        for( var i = 0; i <= data.length - 1; i ++ ){
          if ( data[i] != undefined ){
            this.horarios.push( data[i]["hora"] )
          }
        }
    })
  }

  public getHorsById( uid, dia ){
    return this.days = this.horarioscollection.doc( uid ).collection(dia).snapshotChanges().map(
      changes => { return changes.map( a => {
          const data = a.payload.doc.data() as Horarios;
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
