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
  {
    path: 'cliente-inicio',
    loadChildren: () => import('./cliente-inicio/cliente-inicio.module').then( m => m.ClienteInicioPageModule)
  },
  {
    path: 'mecanico-inicio',
    loadChildren: () => import('./mecanico-inicio/mecanico-inicio.module').then( m => m.MecanicoInicioPageModule)
  },
  {
    path: 'mecanico-pedidos',
    loadChildren: () => import('./mecanico-pedidos/mecanico-pedidos.module').then( m => m.MecanicoPedidosPageModule)
  },
  {
    path: 'cliente-agrega-auto',
    loadChildren: () => import('./cliente-agrega-auto/cliente-agrega-auto.module').then( m => m.ClienteAgregaAutoPageModule)
  },
  {
    path: 'cliente-servicio',
    loadChildren: () => import('./cliente-servicio/cliente-servicio.module').then( m => m.ClienteServicioPageModule)
  },
  {
    path: 'cliente-lugar',
    loadChildren: () => import('./cliente-lugar/cliente-lugar.module').then( m => m.ClienteLugarPageModule)
  },
  {
    path: 'cliente-mecanico',
    loadChildren: () => import('./cliente-mecanico/cliente-mecanico.module').then( m => m.ClienteMecanicoPageModule)
  },
  {
    path: 'cliente-pago',
    loadChildren: () => import('./cliente-pago/cliente-pago.module').then( m => m.ClientePagoPageModule)
  },
  {
    path: 'cliente-mis-servicios',
    loadChildren: () => import('./cliente-mis-servicios/cliente-mis-servicios.module').then( m => m.ClienteMisServiciosPageModule)
  },
  {
    path: 'cliente-agenda-mantencion',
    loadChildren: () => import('./cliente-agenda-mantencion/cliente-agenda-mantencion.module').then( m => m.ClienteAgendaMantencionPageModule)
  },
  {
    path: 'cliente-pago-exito',
    loadChildren: () => import('./cliente-pago-exito/cliente-pago-exito.module').then( m => m.ClientePagoExitoPageModule)
  },
  {
    path: 'modal',
    loadChildren: () => import('./modal/modal.module').then( m => m.ModalPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
