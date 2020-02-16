import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdministradorAceitesListaPageRoutingModule } from './administrador-aceites-lista-routing.module';

import { AdministradorAceitesListaPage } from './administrador-aceites-lista.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdministradorAceitesListaPageRoutingModule
  ],
  declarations: [AdministradorAceitesListaPage]
})
export class AdministradorAceitesListaPageModule {}
