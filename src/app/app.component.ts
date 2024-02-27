import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { UserService } from './core/services/user.service';
import { NavigationEnd, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AjustesComponent } from './pages/components/ajustes/ajustes.component';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  folder: any;
  constructor(
    public userSvc: UserService,
    private router:Router,
    private modalCtrl: ModalController
  ) {
    this.router.events.subscribe({
      next: (value) => {
        if (value instanceof NavigationEnd) {
          console.log(value.url);
          this.folder = value.url;
        }
      },
      error: (err) => console.log(err)
    });
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

