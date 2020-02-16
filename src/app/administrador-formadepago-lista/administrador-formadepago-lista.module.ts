import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdministradorFormadepagoListaPageRoutingModule } from './administrador-formadepago-lista-routing.module';

import { AdministradorFormadepagoListaPage } from './administrador-formadepago-lista.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdministradorFormadepagoListaPageRoutingModule
  ],
  declarations: [AdministradorFormadepagoListaPage]
})
export class AdministradorFormadepagoListaPageModule {}
