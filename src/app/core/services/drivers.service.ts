import { Injectable } from '@angular/core';
import { DocumentData, DocumentReference, Firestore, addDoc, collection, collectionData, doc, getDoc } from '@angular/fire/firestore';
import Driver from '../interfaces/driver.interface';
import { Observable, from, map } from 'rxjs';
import Apuesta from '../interfaces/apuesta.interface';
import { FirebaseService } from './firebase/firebase-service';

@Injectable({
  providedIn: 'root'
})
export class DriversService {

  constructor(
    private firestore: Firestore,
    private firebase: FirebaseService) {}

  addDriver(driver: Driver) {
    const driverRef = collection(this.firestore, 'driver');
    return addDoc(driverRef, driver);
  }

  getDrivers(): Observable<Driver[]>{
    const driverRef = collection(this.firestore, 'driver');
    return collectionData(driverRef, { idField: 'id' }) as Observable<Driver[]>;
  }

  getDriverById(id:string):Promise<Driver>{
    return new Promise<Driver>(async (resolve, reject)=>{
      try {
        var driver = (await this.firebase.getDocument('driver', id));
        resolve({
          id: driver.id,
          name: driver.data['name'],
          team: driver.data['team'],
          yearBirth: driver.data['yearBirth'],
          picture: driver.data['picture'],
        });  
      } catch (error) {
        reject(error);
      }
    });
  }

}
