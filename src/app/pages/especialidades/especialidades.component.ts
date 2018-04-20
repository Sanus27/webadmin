import { Component, OnInit } from '@angular/core';
import { AngularFirestore,  AngularFirestoreCollection } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Auth_Service } from '../../services/auth_service';
import { LocalStorageService } from '../../services/localstorage.service';
import { EspecialidadesService } from '../../services/especialidades.service';
import { Especialidades } from '../../models/Especialidades';

declare var $:any;

@Component({
  selector: 'app-especialidades',
  templateUrl: './especialidades.component.html',
})
export class EspecialidadesComponent implements OnInit {

  private err:boolean;
  private result:boolean;
  private error:string;
  private success:string;
  private uid:any;
  private updated:boolean;
  private arr: any;
  private especialidades = { nombre:'' };

  private especiaidadescollection: AngularFirestoreCollection<Especialidades>;

  constructor( private _router:Router, private _auth:Auth_Service, private _sesion:LocalStorageService, private _espec:EspecialidadesService, public _db: AngularFirestore ) {
    this.uid = this._sesion.cargarSesion();
    this.success = ""
    this.result = false
    this.err = false
    this.error = ""
  }

  ngOnInit() {

    let uid = this._sesion.cargarSesion();
    if( uid){
        this._auth.showUser(uid).valueChanges().subscribe( resp =>{

            let dataUser = resp;
            if(dataUser["tipo"] != "Admin"){

              this._router.navigate(["/login"]);

            } else {

              this.especiaidadescollection = this._db.collection('especialidades');
              this.arr = this.especiaidadescollection.snapshotChanges().map(
                changes => { return changes.map( a => {
                    const data = a.payload.doc.data() as Especialidades;
                    data.id = a.payload.doc.id;
                    return data;
                });
              });




            }

        })
    } else {
      this._router.navigate(["/login"]);
    }

  }


  private showModal( id, user ){
    if( id == 1){
      this.newDoctor()
    }
    if( id == 2){
      this.editDoctor(user);
    }
    this.success = ""
    this.result = false
  }

  private newDoctor(){
      this.updated = false;
      this.especialidades = {
          nombre: undefined
      }
      $('#modal').modal('show');
  }

  private editDoctor( user ){
    this.updated = true;
    this.uid = user.id;
    this.especialidades = {
      nombre: user.nombre
    }
    $('#modal').modal('show');
  }


  private showDelete( user ){
    this.uid = user;
    $('#eliminarUsuario').modal('show');
  }

  private createUser(){
    this.err = false
    this._espec.createEspecialidad( this.especialidades ).then( (result) => {
        this.result = true
        this.success = "Se ha registrado el usuario correctamente"
    }).catch( (err) => {
        console.log("error de usuario en db: ", err)
    })
  }

  private delete(){
    this.err = false
    this.result = false
    this._espec.deleteEspecialidad( this.uid ).then( (resp) => {
      this.result = true
      this.success = "Se ha eliminado con exito el usuario"
    }).catch( (error) => {
      this.err = true
      this.error = "Se ha producido un error, intentalo mas tarde"
    })
  }

  private updateUser(){
    this.err = false
    this.result = false
    this._espec.updateEspecialidad( this.uid, this.especialidades ).then( (resp) => {
      this.result = true
      this.success = "Se han hecho los cambios correctamente"
    }).catch( (error) => {
      this.err = true
      this.error = "Se ha producido un error, intentalo mas tarde"
    })
  }



}
