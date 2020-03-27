import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';
import {AuthGuardService} from '../services/auth-guard.service';
/*
const routes: Routes = [
  {
    path: '',
    component: TabsPage
  }
];

 */

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: '../home/home.module#HomePageModule',
        canActivate: [AuthGuardService]
      },
      {
        path: 'reservas',
        loadChildren: '../reservas/reservas.module#ReservasPageModule',
        canActivate: [AuthGuardService]
      },
      {
        path: 'notificaciones',
        loadChildren: '../notificaciones/notificaciones.module#NotificacionesPageModule',
        canActivate: [AuthGuardService]
      },
      {
        path: 'mantenedor',
        loadChildren: '../mantenedores/mantenedor/mantenedor.module#MantenedorPageModule',
        canActivate: [AuthGuardService]
      },
      {
        path: 'estadisticas',
        loadChildren: '../estadisticas/estadisticas.module#EstadisticasPageModule',
        canActivate: [AuthGuardService]
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
