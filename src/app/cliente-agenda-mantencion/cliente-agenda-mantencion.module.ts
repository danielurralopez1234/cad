import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClienteAgendaMantencionPageRoutingModule } from './cliente-agenda-mantencion-routing.module';

import { ClienteAgendaMantencionPage } from './cliente-agenda-mantencion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClienteAgendaMantencionPageRoutingModule
  ],
  declarations: [ClienteAgendaMantencionPage]
})
export class ClienteAgendaMantencionPageModule {}
