import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MecanicoPedidosPageRoutingModule } from './mecanico-pedidos-routing.module';

import { MecanicoPedidosPage } from './mecanico-pedidos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MecanicoPedidosPageRoutingModule
  ],
  declarations: [MecanicoPedidosPage]
})
export class MecanicoPedidosPageModule {}
