import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificacionesPageRoutingModule } from './notificaciones-routing.module';

import { NotificacionesPage } from './notificaciones.page';
import {ClientePage} from './modals/cliente/cliente.page';
import {UbicacionPage} from './modals/ubicacion/ubicacion.page';
import {AutoPage} from './modals/auto/auto.page';
import {AceiteInfoPage} from './modals/aceite-info/aceite-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificacionesPageRoutingModule
  ],
  declarations: [NotificacionesPage, ClientePage, UbicacionPage, AutoPage, AceiteInfoPage],
  entryComponents: [ClientePage, UbicacionPage, AutoPage, AceiteInfoPage]
})
export class NotificacionesPageModule {}
