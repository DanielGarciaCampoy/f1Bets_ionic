import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import Circuit from 'src/app/core/interfaces/circuit.interface';
import { CircuitsService } from 'src/app/core/services/circuits.service';
import { ApuestaEditComponent } from '../../components/apuesta-edit/apuesta-edit.component';
import { ApuestasService } from 'src/app/core/services/apuestas.service';
import { CircuitosEditComponent } from '../../components/circuitos-edit/circuitos-edit.component';
import { UserService } from 'src/app/core/services/user.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-circuitos',
  templateUrl: './circuitos.page.html',
  styleUrls: ['./circuitos.page.scss'],
})
export class CircuitosPage implements OnInit {

  user$!: Observable<User | null>;

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
    private alertCtrl: AlertController,
    private userSvc: UserService
  ) { }

  ngOnInit(): void {
    this.circuitsSvc.getCircuits().subscribe(circuits => {
      this.circuits = circuits;
    });
    this.user$ = this.userSvc.getUser();
  }

  onEditCircuit(circuit: Circuit) {
    this.abrirCircuitForm(circuit);
    this.setOpen(false);
  }

  async abrirCircuitForm(circuit?:Circuit) {
    const modal = await this.modalCtrl.create({
      component:CircuitosEditComponent,
      cssClass:"modal-full-right-side",
      componentProps:{ circuit:circuit },
    });
    modal.present();
    modal.onDidDismiss().then(result=>{
      if(result && result.data) {
        switch(result.data.mode) {
          case 'New':
            this.circuitsSvc.addCircuit(result.data.circuit);
            break;
          case 'Edit':
            this.circuitsSvc.updateCircuit(result.data.circuit);
            break;
          default:
        }
      }
    });
  }

  onAddCircuit() {
    this.abrirCircuitForm();
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
