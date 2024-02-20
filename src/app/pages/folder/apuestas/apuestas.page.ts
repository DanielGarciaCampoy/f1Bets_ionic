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

  apuestas: Apuesta[] | undefined;

  @Output() onEdit = new EventEmitter;
  @Output() onDelete = new EventEmitter;
  @Input('apuesta') set apuesta(a:Apuesta) {
    this._apuesta = a;
    this.loadDriverAndCircuit(a);
  }

  private async loadDriverAndCircuit(a:Apuesta) {
    // this._driver.next(await this.driverSvc.getDriverById(a.idDriver));
    
  }

  private _apuesta:Apuesta | undefined;
  
  private _driver:BehaviorSubject<Driver> = new BehaviorSubject<Driver>(null!);
  private _circuit:BehaviorSubject<Circuit> = new BehaviorSubject<Circuit>(null!);
  driver$: Observable<Driver> = this._driver.asObservable();
  // circuit$: Observable<Circuit> = this._circuit.asObservable();

  constructor(
    private apuestasSvc: ApuestasService,
    private driverSvc: DriversService,
    private circuitSvc: CircuitsService
  ) { }

  ngOnInit(): void {
    this.apuestasSvc.getApuestas().subscribe(apuestas => {
      this.apuestas = apuestas;
    })
  }

  /*getDriverById(id: string): Promise<Driver | undefined> {
    return this.driverSvc.getDriverById(id);
  }*/

}
