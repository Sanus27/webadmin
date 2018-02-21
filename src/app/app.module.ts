import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { PieComponent } from './components/pie/pie.component';

//ROUTER
import { LoginComponent } from './pages/login/login.component';
import { APP_ROUTING } from './app.router';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { DoctoresComponent } from './pages/doctores/doctores.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { InicioComponent } from './pages/inicio/inicio.component';

//SERVICES
import { Auth_Service } from './services/auth_service';
import { LocalStorage_Service } from './services/localstorage_service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PieComponent,
    UsuariosComponent,
    DoctoresComponent,
    HeaderComponent,
    MenuComponent,
    InicioComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    APP_ROUTING,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [
    Auth_Service,
    LocalStorage_Service
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
