import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { DoctoresComponent } from './pages/doctores/doctores.component';
import { HospitalesComponent } from './pages/hospitales/hospitales.component';
import { HorariosComponent } from './pages/horarios/horarios.component';
import { EspecialidadesComponent } from './pages/especialidades/especialidades.component';

const APP_ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'hospitales', component: HospitalesComponent },
  { path: 'doctores', component: DoctoresComponent },
  { path: 'horarios', component: HorariosComponent },
  { path: 'especialidades', component: EspecialidadesComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash:true});
