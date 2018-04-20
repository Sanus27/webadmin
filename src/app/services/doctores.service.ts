import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore,  AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Usuarios } from '../models/Usuarios';
import { Doctores } from '../models/Doctores';

@Injectable()
export class DoctoresService {

  private userscollection: AngularFirestoreCollection<Usuarios>;
  private doctorcollection: AngularFirestoreCollection<Doctores>;
  private users:any;
  private userDoc: AngularFirestoreDocument<Usuarios>;
  private resp:string;
  public cedula:string = undefined
  public especialidad:string = undefined
  public hospital:string = undefined

  constructor( public _db: AngularFirestore, public _auth:AngularFireAuth ) {
    this.resp = "success"
    this.userscollection = this._db.collection('usuarios');
    this.doctorcollection = this._db.collection('doctores');
  }

  public getUsers( uid ) {


    return this.getDoctorById( uid ).map( data => {
        for( var i = 0; i <= data.length - 1; i ++ ){
            if ( data[i] != undefined ){
                this.cedula = data[i]["cedula"]
                this.especialidad = data[i]["especialidad"]
                this.hospital = data[i]["hospital"]
            }
        }
    })


  }

  public getDoctorById( uid ){
    return this.users = this.doctorcollection.snapshotChanges().map(
      changes => { return changes.map( a => {
          const data = a.payload.doc.data() as Doctores;
          data.id = a.payload.doc.id;
          if ( data.id == uid ) {
            return data;
          }
      });
    });
  }

  public createUser(user) {
    return this._auth.auth.createUserWithEmailAndPassword( user.email, user.password);
  }

  public addUser(uid, user){
    return this.userscollection.doc( uid ).set({
      avatar: "userDefaults.png",
      apellido: user.lastname,
      nombre: user.name,
      estado: "0",
      tipo: "Medico"
    })
  }

  public addDoctor(uid, doctor){
    return this.doctorcollection.doc( uid ).set({
      calificacion: "0",
      cedula: doctor.cedula,
      comentario: "0",
      especialidad: doctor.especialidad,
      cv: "",
      hospital: doctor.hospital
    })
  }


  public deleteUser( user ) {
    let uid:string = user.id;
    return this._db.collection("usuarios").doc( uid ).update({
      estado: "eliminado",
    })
  }

  public update( id, user ) {
    return this._db.collection("usuarios").doc( id ).update({
      apellido: user.lastname,
      nombre: user.name,
    })
  }




}
