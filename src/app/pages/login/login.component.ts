import { Component } from '@angular/core';
import { Auth_Service } from '../../services/auth_service';
import { LocalStorage_Service } from '../../services/localstorage_service';

declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent{

  private titleModal:string;
  private bodyModal:string;
  private avancedModal:boolean;
  private loadModal:boolean;
  constructor( public _auth:Auth_Service, public _sesion:LocalStorage_Service ) {
    this.loadModal = true;
    this.avancedModal = false;
    this.titleModal = "Acceso restringido";
    this.bodyModal = "Está cuenta no tiene los premisos para entrar al sistema";
  }
  public login:object = {
    email: undefined,
    password: undefined
  };

  public startLogin() {
    this.loadModal = true;
    $('#modal').modal('show');
      setTimeout(() => {

        let email = this.login["email"];
        let password = this.login["password"];
        this._auth.login( email, password ).then( resp => {
            $('#modal').modal('hide');
            this.loadModal = false;
            let dataUser = this._auth.userInfo;
            let typeUser = dataUser[0]["tipo"];
            this._sesion.guardarSesion( typeUser );
            console.log( resp );
        }).catch( error => {

        })

      }, 5000);

  }

}
