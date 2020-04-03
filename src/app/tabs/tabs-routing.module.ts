import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';
import {AuthGuardService} from '../services/auth-guard.service';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then( m => m.HomePageModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'reservas',
        loadChildren: () => import('../reservas/reservas.module').then( m => m.ReservasPageModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'notificaciones',
        loadChildren: () => import('../notificaciones/notificaciones.module').then( m => m.NotificacionesPageModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'mantenedor',
        loadChildren: () => import('../mantenedores/mantenedor/mantenedor.module').then( m => m.MantenedorPageModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'estadisticas',
        loadChildren: () => import('../estadisticas/estadisticas.module').then( m => m.EstadisticasPageModule),
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
