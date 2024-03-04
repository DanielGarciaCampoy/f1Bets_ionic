import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DriversService } from 'src/app/core';
import Apuesta from 'src/app/core/interfaces/apuesta.interface';
import Circuit from 'src/app/core/interfaces/circuit.interface';
import Driver from 'src/app/core/interfaces/driver.interface';
import { CircuitsService } from 'src/app/core/services/circuits.service';

@Component({
  selector: 'app-apuesta',
  templateUrl: './apuesta.component.html',
  styleUrls: ['./apuesta.component.scss'],
})
export class ApuestaComponent  implements OnInit {

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
    private driverSvc: DriversService
  ) { }

  ngOnInit() {}

}
