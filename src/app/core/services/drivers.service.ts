import { Injectable } from '@angular/core';
import { DocumentData, DocumentReference, Firestore, addDoc, collection, collectionData, doc, getDoc } from '@angular/fire/firestore';
import Driver from '../interfaces/driver.interface';
import { Observable, from, map } from 'rxjs';
import Apuesta from '../interfaces/apuesta.interface';

@Injectable({
  providedIn: 'root'
})
export class DriversService {

  constructor(private firestore: Firestore) {}

  addDriver(driver: Driver) {
    const driverRef = collection(this.firestore, 'driver');
    return addDoc(driverRef, driver);
  }

  getDrivers(): Observable<Driver[]>{
    const driverRef = collection(this.firestore, 'driver');
    return collectionData(driverRef, { idField: 'id' }) as Observable<Driver[]>;
  }

  /*getDriverById(id:string): Promise<Driver> {
    const driverRef = doc(this.firestore, 'driver', id);
    return from(getDoc(driverRef)).pipe(
      map(driverSnap => driverSnap.data())
    );
  }*/

  /*getDriverById(id: string): Promise<Driver | undefined> {
    const driverRef: DocumentReference<DocumentData> = doc(this.firestore, 'driver', id);
  
    return from(getDoc(driverRef)).toPromise()
        .then(driverSnap => {
            if (driverSnap && driverSnap.exists()) {
                const data = driverSnap.data();
                return {
                    id: data['id'],
                    name: data['idCircuit'],
                    team: data['idDriver'],
                    yearBirth: data['betMoney'],
                    picture: data['picture']
                } as Driver;
            } else {
                return undefined;
            }
        })
        .catch(error => {
            console.error('Error fetching driver:', error);
            throw error;
        });
  }*/

  /*getDriverById(id:string):Promise<Driver>{
    return new Promise<Driver>(async (resolve, reject)=>{
      try {
        var driver = (await this.firebase.getDocument('driver', id));
        resolve({
          id: driver.data.id,
          name: driver.data.name,
          team: driver.data.team,
          yearBirth: driver.data.yearBirth,
          picture: driver.data.picture,
        });  
      } catch (error) {
        reject(error);
      }
    });
  }*/

}
  
