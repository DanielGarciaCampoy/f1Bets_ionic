import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonAccordionGroup, ModalController } from '@ionic/angular';
import { DriversService } from 'src/app/core';
import Driver from 'src/app/core/interfaces/driver.interface';

export const DRIVER_PROFILE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DriverSelectableComponent),
  multi: true
};

@Component({
  selector: 'app-driver-selectable',
  templateUrl: './driver-selectable.component.html',
  styleUrls: ['./driver-selectable.component.scss'],
  providers: [DRIVER_PROFILE_VALUE_ACCESSOR]
})
export class DriverSelectableComponent  implements OnInit, ControlValueAccessor {

  selectedDriver:Driver | null = null;
  propagateChange = (_: any) => { }
  isDisabled:boolean = false;

  drivers: Driver[] | undefined;

  constructor(
    private driversSvc: DriversService
  ) { }

  ngOnInit(): void {
    this.driversSvc.getDrivers().subscribe(drivers => {
      this.drivers = drivers;
    })
  }

  async writeValue(obj: any) {
    try {
      if (obj) {
        this.selectedDriver = await this.driversSvc.getDriverById(obj);
      } else {
        this.selectedDriver = null;
      }
    } catch (error) {
      console.log("No se ha podido recupera los datos: "+ error);
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

  onDriverClicked(driver:Driver, accordion:IonAccordionGroup){
    this.selectedDriver = driver;
    accordion.value='';
    this.propagateChange(this.selectedDriver.id);
  }

}
