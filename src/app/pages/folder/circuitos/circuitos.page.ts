import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import Circuit from 'src/app/core/interfaces/circuit.interface';
import { CircuitsService } from 'src/app/core/services/circuits.service';
import { ApuestaEditComponent } from '../../components/apuesta-edit/apuesta-edit.component';
import { ApuestasService } from 'src/app/core/services/apuestas.service';

@Component({
  selector: 'app-circuitos',
  templateUrl: './circuitos.page.html',
  styleUrls: ['./circuitos.page.scss'],
})
export class CircuitosPage implements OnInit {

  circuits: Circuit[] | undefined;
  selectedCircuit: any;

  isModalOpen = false;

  setOpen(isOpen: boolean, circuit?: any) {
    this.isModalOpen = isOpen;
    if (circuit) {
      this.selectedCircuit = circuit;
    }
  }

  constructor(
    private circuitsSvc: CircuitsService,
    private modalCtrl: ModalController,
    private apuestasSvc: ApuestasService,
    private alertCtrl: AlertController
  ) { }

  ngOnInit(): void {
    this.circuitsSvc.getCircuits().subscribe(circuits => {
      this.circuits = circuits;
    })
  }

  onEditCircuit(circuit: Circuit) {

    this.setOpen(false);
  }

  onAddCircuit() {

    this.setOpen(false);
  }

  async deleteCircuitAlert() {
    const alert = await this.alertCtrl.create({
      header: '¿Está seguro?',
      message: 'Eliminarás este circuito permanentemente',
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
            this.deleteCircuit(this.selectedCircuit);
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteCircuit(circuit: Circuit) {
    const response = await this.circuitsSvc.deleteCircuit(circuit);
    console.log(response);
    this.setOpen(false);
  }

}
