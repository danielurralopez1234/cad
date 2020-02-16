import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdministradorFormadepagoPageRoutingModule } from './administrador-formadepago-routing.module';

import { AdministradorFormadepagoPage } from './administrador-formadepago.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdministradorFormadepagoPageRoutingModule
  ],
  declarations: [AdministradorFormadepagoPage]
})
export class AdministradorFormadepagoPageModule {}
