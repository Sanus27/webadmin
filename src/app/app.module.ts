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
import { HospitalesComponent } from './pages/hospitales/hospitales.component';

//SERVICES
import { Auth_Service } from './services/auth_service';
import { LocalStorageService } from './services/localstorage.service';
import { UsuariosService } from './services/usuarios.service';
import { DoctoresService } from './services/doctores.service';
import { HospitalesService } from './services/hospitales.service';
import { EspecialidadesService } from './services/especialidades.service';
import { HorariosService } from './services/horarios.service';
//PIPES
import { FiltroPipe } from './pipes/filtro.pipe';
import { FinfotoPipe } from './pipes/finfoto.pipe';
import { HorariosComponent } from './pages/horarios/horarios.component';
import { EspecialidadesComponent } from './pages/especialidades/especialidades.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PieComponent,
    UsuariosComponent,
    DoctoresComponent,
    HeaderComponent,
    MenuComponent,
    InicioComponent,
    FiltroPipe,
    HospitalesComponent,
    FinfotoPipe,
    HorariosComponent,
    EspecialidadesComponent
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
    HorariosService,
    UsuariosService,
    DoctoresService,
    HospitalesService,
    LocalStorageService,
    EspecialidadesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
