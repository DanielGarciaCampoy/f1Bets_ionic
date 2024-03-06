import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Observable, first } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { UserEditComponent } from '../user-edit/user-edit.component';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.scss'],
})
export class AjustesComponent  implements OnInit {

  user$!: Observable<User | null>;

  constructor(
    private userSvc: UserService,
    private modalController: ModalController,
    private alertController: AlertController
  ) { }

  ngOnInit(): void {
    this.user$ = this.userSvc.getUser();
  }

  closeModal() {
    this.modalController.dismiss();
  }

  logOut() {
    this.modalController.dismiss();
    return this.userSvc.logOut();
  }

  async eliminarCuentaAlert() {
    const alert = await this.alertController.create({
      header: '¿Está seguro?',
      message: 'Esta acción eliminará tu cuenta permanentemente',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'rojo',
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.modalController.dismiss();
            this.eliminarCuenta();
          }
        }
      ]
    });
    await alert.present();
  }

  eliminarCuenta() {
    return this.userSvc.deleteAccount();
  }

  onEditUser() {
    this.user$.pipe(first()).subscribe(async (user) => {
      if (user) {
        this.abrirUserForm(user);
        this.modalController.dismiss();
      }
    });
  }

  async abrirUserForm(user:User) {
    const modal = await this.modalController.create({
      component:UserEditComponent,
      cssClass:"modal-full-right-side",
      componentProps:{ user:user }
    });
    modal.present();
    modal.onDidDismiss().then(result=>{
      if (result && result.data) {
        this.userSvc.updateUser(result.data.user);
      }
    });
  }

  onToggleAdmin() {
    return this.userSvc.toggleAdmin();
  }
}
