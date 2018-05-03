import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth_Service } from '../../services/auth_service';
import { LocalStorageService } from '../../services/localstorage.service';

declare var $:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent{

  constructor( public _router:Router, public _auth:Auth_Service, public _sesion:LocalStorageService ) {}

  public exit(){
    $('#cerrarsesion').modal('hide');
    this._auth.signOut();
    this._sesion.eliminarSesion();
    this._router.navigate(["/login"]);
  }

}
