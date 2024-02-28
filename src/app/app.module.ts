import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { register } from 'swiper/element/bundle';
import { CoreModule } from './core/core.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './pages/login/components/signin/signin.component';
import { getStorage, provideStorage } from '@angular/fire/storage';

register();

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, IonicModule.forRoot(), AppRoutingModule, IonicModule,
    CoreModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    // provideFirebaseApp(() => initializeApp({"projectId":"f1bets-74760","appId":"1:996516886382:web:54ca52da55f0b20086337f","storageBucket":"f1bets-74760.appspot.com","locationId":"europe-west","apiKey":"AIzaSyC72Pwa0ObiKSBRQsRD9HjGebqH2HtHa9Y","authDomain":"f1bets-74760.firebaseapp.com","messagingSenderId":"996516886382"})),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage())
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
