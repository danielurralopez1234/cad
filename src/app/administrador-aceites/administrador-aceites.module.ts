import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdministradorAceitesPageRoutingModule } from './administrador-aceites-routing.module';

import { AdministradorAceitesPage } from './administrador-aceites.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdministradorAceitesPageRoutingModule
  ],
  declarations: [AdministradorAceitesPage]
})
export class AdministradorAceitesPageModule {}
