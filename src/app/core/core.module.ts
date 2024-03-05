import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from './utils/translate.utils';
import { AjustesComponent } from '../pages/components/ajustes/ajustes.component';
import { HomePage } from '../pages/folder/home/home.page';
import { DriverEditComponent } from '../pages/components/driver-edit/driver-edit.component';
import { UserEditComponent } from '../pages/components/user-edit/user-edit.component';
import { SigninComponent } from '../pages/login/components/signin/signin.component';
import { SignupComponent } from '../pages/login/components/signup/signup.component';
import { ApuestasPage } from '../pages/folder/apuestas/apuestas.page';
import { CircuitosPage } from '../pages/folder/circuitos/circuitos.page';
import { PilotosPage } from '../pages/folder/pilotos/pilotos.page';
import { TabsPage } from '../pages/folder/tabs/tabs.page';
import { LoginPage } from '../pages/login/login.page';
import { ApuestaComponent } from '../pages/components/apuesta/apuesta.component';
import { ApuestaEditComponent } from '../pages/components/apuesta-edit/apuesta-edit.component';
import { CircuitoSelectableComponent } from '../pages/components/circuito-selectable/circuito-selectable.component';
import { DriverSelectableComponent } from '../pages/components/driver-selectable/driver-selectable.component';
import { CircuitosEditComponent } from '../pages/components/circuitos-edit/circuitos-edit.component';

@NgModule({
  declarations: [
    // components
    AjustesComponent, DriverEditComponent, UserEditComponent, SigninComponent, SignupComponent, ApuestaComponent, ApuestaEditComponent, CircuitoSelectableComponent, DriverSelectableComponent,
    CircuitosEditComponent,
    // pages
    ApuestasPage, CircuitosPage, PilotosPage, LoginPage, TabsPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    // translate
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
        }
    }),
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
