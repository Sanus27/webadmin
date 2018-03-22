  import { Component, OnInit } from '@angular/core';
  import { Router } from '@angular/router';
  import { Observable } from 'rxjs/Observable';
  import { AngularFirestore } from 'angularfire2/firestore';
  import { Auth_Service } from '../../services/auth_service';
  import { LocalStorageService } from '../../services/localstorage.service';
  import { DoctoresService } from '../../services/doctores.service';
  import { Doctores } from '../../models/Doctores';

  declare var $:any;

  @Component({
    selector: 'app-doctores',
    templateUrl: './doctores.component.html',
  })
  export class DoctoresComponent implements OnInit {

      private err:boolean;
      private result:boolean;
      private error:string;
      private success:string;
      private uid:any;
      private updated:boolean;
      private arr: Doctores[] = [];
      private users = { avatar:'', lastname: '', name: '', email: '', password: 'Sanus27' };

      constructor( private _router:Router, private _auth:Auth_Service,  public _user: DoctoresService, private _sesion:LocalStorageService ) {
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

                  this._user.getUsers().subscribe( (user: Doctores[]) => {
                      this.arr = user;
                      console.log( this.arr )
                  })

                }
            })
        } else {
          this._router.navigate(["/login"]);
        }

      }


      private showModal( id, user ){
        if( id == 1){
          this.updated = false;
          this.users = {
            avatar: undefined,
            name: undefined,
            lastname: undefined,
            email: undefined,
            password: 'Sanus27',
          }
        }
        if( id == 2){
          this.updated = true;
          this.users = {
            avatar: undefined,
            name: user.nombre,
            lastname: user.apellido,
            email: undefined,
            password: 'Sanus27',
          }

        }
        this.success = ""
        this.result = false
        $('#modal').modal('show');
      }

      private showDelete( user ){
        this.uid = user;
        $('#eliminarUsuario').modal('show');
      }

      private createUser(){
        this.err = false
        this._user.createUser(this.users).then( (data => {
          let uid = data.uid

          this._user.addUser( uid, this.users ).then( (result) => {
            this.result = true
            this.success = "Se ha registrado el usuario correctamente"
          }).catch( (err) => {
            console.log("error de usuario en db: ", err)
          })

        })).catch( (error) => {
          if (error.code == "auth/invalid-email") {
            this.err = true
            this.error = "Este no es un correo valido"
            console.log("auth/invalid-email")
          }
          if (error.code == "auth/email-already-in-use") {
            this.err = true
            this.error = "Este correo ya tiene una cuenta"
            console.log("auth/email-already-in-use")
          }
          console.log("error de autenticacion: ", error)
        })
      }

      private delete(){
        this.err = false
        this.result = false
        this._user.deleteUser( this.uid ).then( (resp) => {
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
        this._user.update( this.uid, this.users ).then( (resp) => {
          this.result = true
          this.success = "Se han hecho los cambios correctamente"
        }).catch( (error) => {
          this.err = true
          this.error = "Se ha producido un error, intentalo mas tarde"
        })

      }



  }
