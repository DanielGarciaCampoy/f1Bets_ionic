import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { DriversService } from 'src/app/core';
import Apuesta from 'src/app/core/interfaces/apuesta.interface';
import Circuit from 'src/app/core/interfaces/circuit.interface';
import Driver from 'src/app/core/interfaces/driver.interface';
import { ApuestasService } from 'src/app/core/services/apuestas.service';
import { CircuitsService } from 'src/app/core/services/circuits.service';

@Component({
  selector: 'app-apuesta',
  templateUrl: './apuesta.component.html',
  styleUrls: ['./apuesta.component.scss'],
})
export class ApuestaComponent  implements OnInit {

  selectedApuesta: any;
  selectedPilotoAleatorio:any;
  selectedApuestaGanada: any;
  selectedDineroSuficiente: any;
  isModalOpen = false;
  async setOpen(isOpen: boolean, apuesta?: any) {
    this.isModalOpen = isOpen;
    if (apuesta) {
      this.selectedApuesta = apuesta;
    }
    const { pilotoAleatorio, apuestaGanada, dineroSuficiente } = await this.apuestaSvc.procesarApuesta(apuesta);
    this.selectedPilotoAleatorio = pilotoAleatorio;
    this.selectedApuestaGanada = apuestaGanada;
    this.selectedDineroSuficiente = dineroSuficiente;
  }

  @Input('apuesta') set apuesta(a:Apuesta) {
    this._apuesta = a;
    this.loadCircuitAndDriver(a);
  }

  private async loadCircuitAndDriver(a:Apuesta){
    this._circuit.next(await this.circuitSvc.getCircuitById(a.idCircuit));
    this._driver.next(await this.driverSvc.getDriverById(a.idDriver));
  }
  get apuesta():Apuesta{
    return this._apuesta;
  }

  private _apuesta!: Apuesta;

  private _circuit:BehaviorSubject<Circuit> = new BehaviorSubject<Circuit>(null!);
  private _driver:BehaviorSubject<Driver> = new BehaviorSubject<Driver>(null!);
  circuit$:Observable<Circuit> = this._circuit.asObservable();
  driver$:Observable<Driver> = this._driver.asObservable();
  constructor(
    private circuitSvc: CircuitsService,
    private driverSvc: DriversService,
    private alertCtrl: AlertController,
    private apuestaSvc: ApuestasService
  ) { }

  ngOnInit() {}

  async deleteApuestaAlert() {
    const alert = await this.alertCtrl.create({
      header: '¿Está seguro?',
      message: 'Eliminarás esta apuesta permanentemente',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'rojo',
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.deleteApuesta(this.apuesta);
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteApuesta(apuesta: Apuesta) {
    const response = await this.apuestaSvc.deleteApuesta(apuesta);
    console.log(response);
  }

  onApostar(apuesta: Apuesta) {
    this.apuestaSvc.procesarApuesta(apuesta);
    this.setOpen(true, apuesta);
  }

}
