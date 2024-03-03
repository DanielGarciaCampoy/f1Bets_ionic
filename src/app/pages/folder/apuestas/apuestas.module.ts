import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApuestasPageRoutingModule } from './apuestas-routing.module';

import { ApuestasPage } from './apuestas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApuestasPageRoutingModule
  ],
  declarations: []
})
export class ApuestasPageModule {}
