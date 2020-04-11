import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormaPagoPage } from './forma-pago.page';

const routes: Routes = [
  {
    path: '',
    component: FormaPagoPage
  },  {
    path: 'addedit-forma-pago',
    loadChildren: () => import('./modals/addedit-forma-pago/addedit-forma-pago.module').then( m => m.AddeditFormaPagoPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormaPagoPageRoutingModule {}
