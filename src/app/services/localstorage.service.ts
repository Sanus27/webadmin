import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  public guardarSesion( tipo ){
    localStorage.setItem("sesion", tipo);
  }

  public cargarSesion(){
    return localStorage["sesion"];
  }

  public eliminarSesion(){
    localStorage.setItem("sesion", "");
  }

}
