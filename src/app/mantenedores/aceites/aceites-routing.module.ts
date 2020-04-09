import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AceitesPage } from './aceites.page';

const routes: Routes = [
  {
    path: '',
    component: AceitesPage
  },
  {
    path: 'addedit-aceite',
    loadChildren: () => import('./modals/addedit-aceite/addedit-aceite.module').then( m => m.AddeditAceitePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AceitesPageRoutingModule {}
