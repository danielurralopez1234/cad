import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdministradorServiciosListaPageRoutingModule } from './administrador-servicios-lista-routing.module';

import { AdministradorServiciosListaPage } from './administrador-servicios-lista.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdministradorServiciosListaPageRoutingModule
  ],
  declarations: [AdministradorServiciosListaPage]
})
export class AdministradorServiciosListaPageModule {}
