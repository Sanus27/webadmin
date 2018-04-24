import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth_Service } from '../../services/auth_service';
import { LocalStorageService } from '../../services/localstorage.service';

declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent  implements OnInit{

  private titleModal:string;
  private bodyModal:string;
  private avancedModal:boolean;
  private loadModal:boolean;
  constructor( public _auth:Auth_Service, public _sesion:LocalStorageService, public _router:Router ) {
    this.loadModal = true;
    this.avancedModal = false;
  }

  ngOnInit() {

    let uid = this._sesion.cargarSesion();
    if( uid ){
      this._auth.showUser(uid).valueChanges().subscribe( resp =>{
          let dataUser = resp;
          if ( dataUser != null ){
            if(dataUser["tipo"] === "Admin"){
              this._router.navigate(["/inicio"]);
            }
          }
      })
    } else {
      this._router.navigate(["/login"]);
    }

  }

  public login:object = {
    email: undefined,
    password: undefined
  };

  public startLogin() {
    $('#modal').modal('show');
      setTimeout(() => {

        let email = this.login["email"];
        let password = this.login["password"];
        this._auth.login( email, password ).then( resp => {
            $('#modal').modal('hide');
            setTimeout(() => {

              let dataUser = this._auth.userInfo;
              let typeUser:string? = dataUser[0]["tipo"];

              if ( typeUser != null || typeUser != undefined ){
                  if( typeUser === "Admin"){
                      this._sesion.guardarSesion( this._auth.usuario["uid"] );
                      this._router.navigate(["/inicio"]);
                  } else {
                      this.loadModal = false;
                      this.titleModal = "Acceso restringido";
                      this.bodyModal = "Está cuenta no tiene los premisos para entrar al sistema";
                      $('#modal').modal('show');
                  }
              } else {
                this.startLogin()
              }


            }, 500);


        }).catch( error => {

          $('#modal').modal('hide');
          this.loadModal = false;
          setTimeout(() => {
              $('#modal').modal('show');
              this.titleModal = "Se ha producido un error";
              if( error.code == "auth/invalid-email"){
                this.login["email"] = undefined;
                this.bodyModal = "Este correo electronico no es valido";
              }
              if( error.code == "auth/user-not-found"){
                this.login["email"] = undefined;
                this.bodyModal = "Este correo electronico no existe";
              }
              if( error.code == "auth/wrong-password"){
                this.login["email"] = undefined;
                this.login["password"] = undefined;
                this.bodyModal = "La contrasena es incorrecta";
              }

          }, 500);

        })

      }, 1000);

  }

}
