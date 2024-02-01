import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import Driver from '../interfaces/driver.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriversService {

  constructor(private firestore: Firestore) {}

  addDriver(driver: Driver) {
    const driverRef = collection(this.firestore, 'drivers');
    return addDoc(driverRef, driver);
  }

  getDrivers(): Observable<Driver[]>{
    const driverRef = collection(this.firestore, 'driver');
    return collectionData(driverRef, { idField: 'id' }) as Observable<Driver[]>;
  }
  
}
