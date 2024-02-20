import { Injectable } from '@angular/core';
import { DocumentData, DocumentReference, Firestore, addDoc, collection, collectionData, doc, getDoc } from '@angular/fire/firestore';
import Circuit from '../interfaces/circuit.interface';
import { Observable, from } from 'rxjs';
import Apuesta from '../interfaces/apuesta.interface';

@Injectable({
  providedIn: 'root'
})
export class CircuitsService {

  constructor(private firestore: Firestore) { }

  addCircuit(circuit: Circuit) {
    const circuitRef = collection(this.firestore, 'circuit');
    return addDoc(circuitRef, circuit);
  }

  getCircuits(): Observable<Circuit[]>{
    const circuitRef = collection(this.firestore, 'circuit');
    return collectionData(circuitRef, { idField: 'id' }) as Observable<Circuit[]>;
  }

  /*getCircuitById(id:string):Promise<Circuit>{
    return new Promise<Circuit>(async (resolve, reject)=>{
      try {
        var driver = (await this.firebase.getDocument('circuit', id));
        resolve({
          
        });  
      } catch (error) {
        reject(error);
      }
    });
  }*/

}
