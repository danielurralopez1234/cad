import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MecanicosPageRoutingModule } from './mecanicos-routing.module';
import { MecanicosPage } from './mecanicos.page';
import { AddeditMecanicosPage } from './modals/addedit-mecanicos/addedit-mecanicos.page';
import { AddeditMecanicosPageRoutingModule } from './modals/addedit-mecanicos/addedit-mecanicos-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MecanicosPageRoutingModule,
    AddeditMecanicosPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [MecanicosPage, AddeditMecanicosPage],
  entryComponents: [AddeditMecanicosPage]
})
export class MecanicosPageModule {}
