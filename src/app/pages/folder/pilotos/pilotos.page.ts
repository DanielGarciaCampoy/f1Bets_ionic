import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { DriversService } from 'src/app/core';
import Driver from 'src/app/core/interfaces/driver.interface';

@Component({
  selector: 'app-pilotos',
  templateUrl: './pilotos.page.html',
  styleUrls: ['./pilotos.page.scss'],
})
export class PilotosPage implements OnInit {

  drivers: Driver[] | undefined;
  selectedDriver: any;

  isModalOpen = false;

  setOpen(isOpen: boolean, driver?: any) {
    this.isModalOpen = isOpen;
    if (driver) {
      this.selectedDriver = driver;
    }
  }

  constructor(
    private driversSvc: DriversService,
    private alertController: AlertController
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
    })
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

}
