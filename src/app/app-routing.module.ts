import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'olvido-contrasena',
    loadChildren: () => import('./olvido-contrasena/olvido-contrasena.module').then( m => m.OlvidoContrasenaPageModule)
  },
  {
    path: 'crear-cuenta',
    loadChildren: () => import('./crear-cuenta/crear-cuenta.module').then( m => m.CrearCuentaPageModule)
  },
  {
    path: 'administrador-inicio',
    loadChildren: () => import('./administrador-inicio/administrador-inicio.module').then( m => m.AdministradorInicioPageModule)
  },
  {
    path: 'administrador-mecanicos-lista',
    loadChildren: () => import('./administrador-mecanicos-lista/administrador-mecanicos-lista.module').then( m => m.AdministradorMecanicosListaPageModule)
  },
  {
    path: 'administrador-aceites-lista',
    loadChildren: () => import('./administrador-aceites-lista/administrador-aceites-lista.module').then( m => m.AdministradorAceitesListaPageModule)
  },
  {
    path: 'administrador-aceites',
    loadChildren: () => import('./administrador-aceites/administrador-aceites.module').then( m => m.AdministradorAceitesPageModule)
  },
  {
    path: 'administrador-autos-lista',
    loadChildren: () => import('./administrador-autos-lista/administrador-autos-lista.module').then( m => m.AdministradorAutosListaPageModule)
  },
  {
    path: 'administrador-autos',
    loadChildren: () => import('./administrador-autos/administrador-autos.module').then( m => m.AdministradorAutosPageModule)
  },
  {
    path: 'administrador-servicios-lista',
    loadChildren: () => import('./administrador-servicios-lista/administrador-servicios-lista.module').then( m => m.AdministradorServiciosListaPageModule)
  },
  {
    path: 'administrador-servicios',
    loadChildren: () => import('./administrador-servicios/administrador-servicios.module').then( m => m.AdministradorServiciosPageModule)
  },
  {
    path: 'administrador-formadepago-lista',
    loadChildren: () => import('./administrador-formadepago-lista/administrador-formadepago-lista.module').then( m => m.AdministradorFormadepagoListaPageModule)
  },
  {
    path: 'administrador-formadepago',
    loadChildren: () => import('./administrador-formadepago/administrador-formadepago.module').then( m => m.AdministradorFormadepagoPageModule)
  },
  {
    path: 'administrador-mecanicos',
    loadChildren: () => import('./administrador-mecanicos/administrador-mecanicos.module').then( m => m.AdministradorMecanicosPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
