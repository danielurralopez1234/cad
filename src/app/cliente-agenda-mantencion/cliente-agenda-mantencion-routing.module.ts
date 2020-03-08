import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClienteAgendaMantencionPage } from './cliente-agenda-mantencion.page';

const routes: Routes = [
  {
    path: '',
    component: ClienteAgendaMantencionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClienteAgendaMantencionPageRoutingModule {}
