import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ServiciosPageRoutingModule } from './servicios-routing.module';
import { ServiciosPage } from './servicios.page';
import { AddeditServicioPage } from './modals/addedit-servicio/addedit-servicio.page';
import { AddeditServicioPageRoutingModule } from './modals/addedit-servicio/addedit-servicio-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiciosPageRoutingModule,
    AddeditServicioPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ServiciosPage, AddeditServicioPage],
  entryComponents: [ AddeditServicioPage ]
})
export class ServiciosPageModule {}
