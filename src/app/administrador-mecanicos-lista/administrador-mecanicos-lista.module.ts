import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdministradorMecanicosListaPageRoutingModule } from './administrador-mecanicos-lista-routing.module';

import { AdministradorMecanicosListaPage } from './administrador-mecanicos-lista.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdministradorMecanicosListaPageRoutingModule
  ],
  declarations: [AdministradorMecanicosListaPage]
})
export class AdministradorMecanicosListaPageModule {}
