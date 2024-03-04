import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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

  constructor(
    private circuitsSvc: CircuitsService,
    private modalCtrl: ModalController,
    private apuestasSvc: ApuestasService
  ) { }

  ngOnInit(): void {
    this.circuitsSvc.getCircuits().subscribe(circuits => {
      this.circuits = circuits;
    })
  }

}
