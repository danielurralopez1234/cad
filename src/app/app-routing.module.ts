import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'bienvenida', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },

  { path: 'register', loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule)
  },
  { path: 'forgot', loadChildren: () => import('./auth/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'terminos-y-condiciones',
    loadChildren: () => import('./terminos-y-condiciones/terminos-y-condiciones.module').then( m => m.TerminosYCondicionesPageModule)
  },
  {
    path: 'contacto',
    loadChildren: () => import('./contacto/contacto.module').then( m => m.ContactoPageModule)
  },
  {
    path: 'mecanicos',
    loadChildren: () => import('./mantenedores/mecanicos/mecanicos.module').then( m => m.MecanicosPageModule)
  },
  {
    path: 'autos',
    loadChildren: () => import('./mantenedores/autos/autos.module').then( m => m.AutosPageModule)
  },
  {
    path: 'aceites',
    loadChildren: () => import('./mantenedores/aceites/aceites.module').then( m => m.AceitesPageModule)
  },
  {
    path: 'servicios',
    loadChildren: () => import('./mantenedores/servicios/servicios.module').then( m => m.ServiciosPageModule)
  },
  {
    path: 'forma-pago',
    loadChildren: () => import('./mantenedores/forma-pago/forma-pago.module').then( m => m.FormaPagoPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'finalizacion',
    loadChildren: () => import('./home/modals/finalizacion/finalizacion.module').then( m => m.FinalizacionPageModule)
  },
  {
    path: 'bienvenida',
    loadChildren: () => import('./slides/bienvenida/bienvenida.module').then( m => m.BienvenidaPageModule)
  },
  {
    path: 'app',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
