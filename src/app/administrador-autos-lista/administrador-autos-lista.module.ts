import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdministradorAutosListaPageRoutingModule } from './administrador-autos-lista-routing.module';

import { AdministradorAutosListaPage } from './administrador-autos-lista.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdministradorAutosListaPageRoutingModule
  ],
  declarations: [AdministradorAutosListaPage]
})
export class AdministradorAutosListaPageModule {}
