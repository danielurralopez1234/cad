import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MecanicoInicioPageRoutingModule } from './mecanico-inicio-routing.module';
import { MecanicoInicioPage } from './mecanico-inicio.page';
import { ModalPage } from '../modal/modal.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MecanicoInicioPageRoutingModule
  ],
  declarations: [
    MecanicoInicioPage,
    ModalPage
  ],
  entryComponents:[
    ModalPage
  ]
})
export class MecanicoInicioPageModule {}
