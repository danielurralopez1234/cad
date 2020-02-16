import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdministradorAutosPageRoutingModule } from './administrador-autos-routing.module';

import { AdministradorAutosPage } from './administrador-autos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdministradorAutosPageRoutingModule
  ],
  declarations: [AdministradorAutosPage]
})
export class AdministradorAutosPageModule {}
