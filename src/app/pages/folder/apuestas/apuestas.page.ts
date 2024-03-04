import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { DriversService } from 'src/app/core';
import  Apuesta from 'src/app/core/interfaces/apuesta.interface';
import Circuit from 'src/app/core/interfaces/circuit.interface';
import Driver from 'src/app/core/interfaces/driver.interface';
import { ApuestasService } from 'src/app/core/services/apuestas.service';
import { CircuitsService } from 'src/app/core/services/circuits.service';

@Component({
  selector: 'app-apuestas',
  templateUrl: './apuestas.page.html',
  styleUrls: ['./apuestas.page.scss'],
})
export class ApuestasPage implements OnInit {

  constructor(
    private apuestasSvc: ApuestasService
  ) { }

  ngOnInit(): void {
    /*this.apuestasSvc.getApuestas().subscribe(apuestas => {
      this.apuestas = apuestas;
    })*/
  }

  getApuestas() {
    return this.apuestasSvc.apuestas$;
  }

  /*getDriverById(id: string): Promise<Driver | undefined> {
    return this.driverSvc.getDriverById(id);
  }*/

}
