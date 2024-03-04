import { Injectable } from '@angular/core';
import { DocumentData, DocumentReference, Firestore, addDoc, collection, collectionData, doc, getDoc } from '@angular/fire/firestore';
import Circuit from '../interfaces/circuit.interface';
import { Observable, from } from 'rxjs';
import Apuesta from '../interfaces/apuesta.interface';
import { FirebaseService } from './firebase/firebase-service';

@Injectable({
  providedIn: 'root'
})
export class CircuitsService {

  constructor(
    private firestore: Firestore,
    private firebase: FirebaseService
    ) { }

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
        var circuit = (await this.firebase.getDocument('circuit', id));
        resolve({
          id: circuit.data['id'],
          nameCircuit: circuit.data['nameCircuit'],
          country: circuit.data['country'],
          laps: circuit.data['laps'],
          length: circuit.data['length'],
          picture: circuit.data['picture'],
        });  
      } catch (error) {
        reject(error);
      }
    });
  }*/

  async getCircuitById(id: string): Promise<Circuit> {
    try {
      const circuitDoc = await getDoc(doc(this.firestore, 'circuit', id));

      if (circuitDoc.exists()) {
        const circuit: Circuit = {
          id: circuitDoc.data()['id'],
          nameCircuit: circuitDoc.data()['nameCircuit'],
          country: circuitDoc.data()['country'],
          laps: circuitDoc.data()['laps'],
          length: circuitDoc.data()['length'],
          picture: circuitDoc.data()['picture'],
        };

        return circuit;
      } else {
        throw new Error('El circuito no existe');
      }
    } catch (error) {
      throw error;
    }
  }

}
