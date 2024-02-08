import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import Circuit from '../interfaces/circuit.interface';
import { Observable } from 'rxjs';

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

}
