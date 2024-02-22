import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { addDoc, collection } from 'firebase/firestore';
import Apuesta from '../interfaces/apuesta.interface';

@Injectable({
  providedIn: 'root'
})
export class ApuestasService {

  constructor(
    private firestore: Firestore
  ) { }

  addApuesta(apuesta: Apuesta) {
    const apuestaRef = collection(this.firestore, 'bets');
    return addDoc(apuestaRef, apuesta);
  }

  getApuestas(): Observable<Apuesta[]> {
    const apuestaRef = collection(this.firestore, 'bets');
    return collectionData(apuestaRef, { idField: 'id' }) as Observable<Apuesta[]>;
  }

}
