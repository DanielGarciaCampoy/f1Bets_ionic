import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonAccordionGroup } from '@ionic/angular';
import Circuit from 'src/app/core/interfaces/circuit.interface';
import { CircuitsService } from 'src/app/core/services/circuits.service';

export const CIRCUIT_PROFILE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CircuitoSelectableComponent),
  multi: true
};

@Component({
  selector: 'app-circuito-selectable',
  templateUrl: './circuito-selectable.component.html',
  styleUrls: ['./circuito-selectable.component.scss'],
  providers:[CIRCUIT_PROFILE_VALUE_ACCESSOR]
})
export class CircuitoSelectableComponent  implements OnInit, ControlValueAccessor {

  selectedCircuit:Circuit | null =null;
  propagateChange = (_: any) => { }
  isDisabled:boolean = false;

  circuits: Circuit[] | undefined;

  constructor(
    private circuitsSvc:CircuitsService
  ) { }

  ngOnInit(): void {
    this.circuitsSvc.getCircuits().subscribe(circuits => {
      this.circuits = circuits;
    })
  }

  async writeValue(obj: any) {
    try {
      if (obj) {
        this.selectedCircuit = await this.circuitsSvc.getCircuitById(obj);
      } else {
        this.selectedCircuit = null;
      }
    } catch (error) {
      console.log("No se ha podido recuperar los datos: " + error);
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onCircuitClicked(circuit:Circuit, accordion:IonAccordionGroup){
    this.selectedCircuit = circuit;
    accordion.value='';
    this.propagateChange(this.selectedCircuit.id);
  }

}
