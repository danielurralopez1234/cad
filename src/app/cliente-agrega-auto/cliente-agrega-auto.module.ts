import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClienteAgregaAutoPageRoutingModule } from './cliente-agrega-auto-routing.module';

import { ClienteAgregaAutoPage } from './cliente-agrega-auto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClienteAgregaAutoPageRoutingModule
  ],
  declarations: [ClienteAgregaAutoPage]
})
export class ClienteAgregaAutoPageModule {}
