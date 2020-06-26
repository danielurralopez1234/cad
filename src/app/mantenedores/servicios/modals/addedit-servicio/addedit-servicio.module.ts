import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddeditServicioPageRoutingModule } from './addedit-servicio-routing.module';

import { AddeditServicioPage } from './addedit-servicio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddeditServicioPageRoutingModule
  ]
})
export class AddeditServicioPageModule {}
