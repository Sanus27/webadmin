import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth_Service } from '../../services/auth_service';
import { LocalStorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
})
export class InicioComponent implements OnInit {

  constructor( public _router:Router, public _auth:Auth_Service, public _sesion:LocalStorageService ) {

  }

  ngOnInit() {

    let uid = this._sesion.cargarSesion();
    if( uid ){
      this._auth.showUser(uid).valueChanges().subscribe( resp =>{
        let dataUser = resp;
        if(dataUser["tipo"] != "Admin"){
          this._router.navigate(["/login"]);
        }
      })
    } else {
      this._router.navigate(["/login"]);
    }

  }

}
