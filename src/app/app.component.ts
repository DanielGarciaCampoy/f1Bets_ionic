import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { UserService } from './core/services/user.service';
import { NavigationEnd, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AjustesComponent } from './pages/components/ajustes/ajustes.component';
import { Observable } from 'rxjs';
import { User } from './core/models/user.model';
import { TranslateService } from '@ngx-translate/core';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  user$!: Observable<User | null>;

  folder: any;
  language = 0; // 0 español, 1 ingles
  constructor(
    private translate: TranslateService,
    public userSvc: UserService,
    private router:Router,
    private modalCtrl: ModalController
  ) {
    this.router.events.subscribe({
      next: (value) => {
        if (value instanceof NavigationEnd) {
          console.log(value.url);
          this.folder = value.url;

          // inicializar user
          this.user$ = this.userSvc.getUser();
        }
      },
      error: (err) => console.log(err)
    });
    // translate
    this.translate.setDefaultLang('es');
    this.router.events.subscribe({
      next: value=>{
        console.log(value);
        if(value instanceof NavigationEnd)
          this.folder=value['url'];
      },
      error:(err)=>console.log(err)
    });
  }

  // Cambiar idioma
  onLanguage() {
    this.language = (this.language+1)%2;
    switch(this.language) {
      case 0:
        this.translate.setDefaultLang('es');
        console.log('Idioma: español');
        break;
      case 1:
        this.translate.setDefaultLang('en');
        console.log('Idioma: inglés');
        break;
    }
  }
  
  logOut() {
    return this.userSvc.logOut();
  }

  getUser() {
    return this.userSvc.getUser();
  }

  async abrirAjustes() {
    const modal = await this.modalCtrl.create({
      component:AjustesComponent,
      cssClass:"modal-full-right-side"
    });

    modal.onDidDismiss().then(async(response)=>{
      try {
        
      } catch (error) {
        console.log(error);
      }
    });
    modal.present();
  }
}

