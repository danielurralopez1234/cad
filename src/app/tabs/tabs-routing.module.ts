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
        children: [
          {
            path: '',
            loadChildren: () => import('../mantenedores/mantenedor/mantenedor.module').then( m => m.MantenedorPageModule),
            canActivate: [AuthGuardService]
          },
          {
            path: 'mecanicos',
            loadChildren: () => import('../mantenedores/mecanicos/mecanicos.module').then( m => m.MecanicosPageModule)
          },
          {
            path: 'clientes',
            loadChildren: () => import('../mantenedores/clientes/clientes.module').then( m => m.ClientesPageModule)
          },
          {
            path: 'aceites',
            loadChildren: () => import('../mantenedores/aceites/aceites.module').then( m => m.AceitesPageModule)
          },
          {
            path: 'autos',
            loadChildren: () => import('../mantenedores/autos/autos.module').then( m => m.AutosPageModule)
          },
          {
            path: 'servicios',
            loadChildren: () => import('../mantenedores/servicios/servicios.module').then( m => m.ServiciosPageModule)
          },
          {
            path: 'forma-pago',
            loadChildren: () => import('../mantenedores/forma-pago/forma-pago.module').then( m => m.FormaPagoPageModule)
          }
        ]

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
