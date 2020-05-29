import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificacionesPage } from './notificaciones.page';

const routes: Routes = [
  {
    path: '',
    component: NotificacionesPage
  },
  {
    path: 'cliente',
    loadChildren: () => import('./modals/cliente/cliente.module').then( m => m.ClientePageModule)
  },
  {
    path: 'ubicacion',
    loadChildren: () => import('./modals/ubicacion/ubicacion.module').then( m => m.UbicacionPageModule)
  },
  {
    path: 'auto',
    loadChildren: () => import('./modals/auto/auto.module').then( m => m.AutoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificacionesPageRoutingModule {}
