import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
  {
    path: 'misautos',
    loadChildren: () => import('./misautos/misautos.module').then( m => m.MisautosPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
