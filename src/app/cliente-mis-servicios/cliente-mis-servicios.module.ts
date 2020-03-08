import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClienteMisServiciosPageRoutingModule } from './cliente-mis-servicios-routing.module';

import { ClienteMisServiciosPage } from './cliente-mis-servicios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClienteMisServiciosPageRoutingModule
  ],
  declarations: [ClienteMisServiciosPage]
})
export class ClienteMisServiciosPageModule {}
