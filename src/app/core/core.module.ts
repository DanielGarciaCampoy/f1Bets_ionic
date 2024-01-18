import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    // components
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule
    // translate
  ],
  exports:[
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    HttpClientModule,
    // components
  ]
})
export class CoreModule { }
