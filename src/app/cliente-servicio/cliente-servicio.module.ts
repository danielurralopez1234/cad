import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClienteServicioPageRoutingModule } from './cliente-servicio-routing.module';

import { ClienteServicioPage } from './cliente-servicio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClienteServicioPageRoutingModule
  ],
  declarations: [ClienteServicioPage]
})
export class ClienteServicioPageModule {}
