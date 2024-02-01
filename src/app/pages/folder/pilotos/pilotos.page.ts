import { Component, OnInit } from '@angular/core';
import { DriversService } from 'src/app/core';
import Driver from 'src/app/core/interfaces/driver.interface';

@Component({
  selector: 'app-pilotos',
  templateUrl: './pilotos.page.html',
  styleUrls: ['./pilotos.page.scss'],
})
export class PilotosPage implements OnInit {

  drivers: Driver[] | undefined;

  constructor(
    private driversSvc: DriversService
  ) {
    this.drivers = [{
      name: 'name',
      team: 'team',
      yearBirth: 2000
    }];
  }

  ngOnInit(): void {
    this.driversSvc.getDrivers().subscribe(drivers => {
      console.log(drivers);
    })
  }

}
