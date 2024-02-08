import { Component, OnInit } from '@angular/core';
import Circuit from 'src/app/core/interfaces/circuit.interface';
import { CircuitsService } from 'src/app/core/services/circuits.service';

@Component({
  selector: 'app-circuitos',
  templateUrl: './circuitos.page.html',
  styleUrls: ['./circuitos.page.scss'],
})
export class CircuitosPage implements OnInit {

  circuits: Circuit[] | undefined;

  constructor(
    private circuitsSvc: CircuitsService
  ) { }

  ngOnInit(): void {
    this.circuitsSvc.getCircuits().subscribe(circuits => {
      this.circuits = circuits;
    })
  }

}
