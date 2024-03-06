import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { DriversService } from 'src/app/core';
import Driver from 'src/app/core/interfaces/driver.interface';
import { DriverEditComponent } from '../../components/driver-edit/driver-edit.component';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-pilotos',
  templateUrl: './pilotos.page.html',
  styleUrls: ['./pilotos.page.scss'],
})
export class PilotosPage implements OnInit {

  user$!: Observable<User | null>;

  drivers: Driver[] | undefined;
  selectedDriver: any;
  edad: any;

  isModalOpen = false;

  setOpen(isOpen: boolean, driver?: any) {
    this.isModalOpen = isOpen;
    if (driver) {
      this.selectedDriver = driver;
      this.edad = new Date().getFullYear() - this.selectedDriver.yearBirth
    }
  }

  constructor(
    private driversSvc: DriversService,
    private alertController: AlertController,
    private modalCtrl: ModalController,
    private userSvc: UserService
  ) {
    this.drivers = [{
      name: 'name',
      team: 'team',
      yearBirth: 2000
    }];
  }

  ngOnInit(): void {
    this.driversSvc.getDrivers().subscribe(drivers => {
      this.drivers = drivers;
    });
    this.user$ = this.userSvc.getUser();
  }

  async deleteDriverAlert() {
    const alert = await this.alertController.create({
      header: '¿Está seguro?',
      message: 'Eliminarás este piloto permanentemente',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'rojo',
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.isModalOpen = false;
            this.deleteDriver(this.selectedDriver);
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteDriver(driver: Driver) {
    const response = await this.driversSvc.deleteDriver(driver);
    console.log(response);
    this.isModalOpen = false;
  }

  onEditDriver(driver: Driver) {
    this.abrirDriverForm(driver);
    this.setOpen(false);
  }

  onAddDriver() {
    this.abrirDriverForm();
    this.setOpen(false);
  }

  async abrirDriverForm(driver?:Driver) {
    const modal = await this.modalCtrl.create({
      component:DriverEditComponent,
      cssClass:"modal-full-right-side",
      componentProps:{ driver:driver },
    });
    modal.present();
    modal.onDidDismiss().then(result=>{
      if(result && result.data) {
        switch(result.data.mode) {
          case 'New':
            this.driversSvc.addDriver(result.data.driver);
            break;
          case 'Edit':
            this.driversSvc.updateDriver(result.data.driver);
            break;
          default:
        }
      }
    });
  }

}
