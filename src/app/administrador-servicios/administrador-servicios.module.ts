import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdministradorServiciosPageRoutingModule } from './administrador-servicios-routing.module';

import { AdministradorServiciosPage } from './administrador-servicios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdministradorServiciosPageRoutingModule
  ],
  declarations: [AdministradorServiciosPage]
})
export class AdministradorServiciosPageModule {}
