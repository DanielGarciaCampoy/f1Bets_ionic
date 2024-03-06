import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Firestore, collectionData, deleteDoc, doc, onSnapshot, query } from '@angular/fire/firestore';
import { DocumentData, addDoc, collection } from 'firebase/firestore';
import Apuesta from '../interfaces/apuesta.interface';
import { DriversService } from './drivers.service';
import { FirebaseService } from './firebase/firebase-service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ApuestasService {

  private _apuestasSubject: BehaviorSubject<Apuesta[]> = new BehaviorSubject<Apuesta[]>([]);
  public apuestas$ = this._apuestasSubject.asObservable();

  unsubscr;
  constructor(
    private firestore: Firestore,
    private driverSvc: DriversService,
    private firebase: FirebaseService,
    private userSvc: UserService
  ) {
    // this.unsubscr = this.firebase.subscribeToCollection('bets', this._apuestasSubject, this.mapAssignment);
    this.unsubscr = this.subscribeToCollection('bets', this._apuestasSubject, this.mapAssignment);

  }

  ngOnDestroy(): void {
    this.unsubscr();
  }

  private mapAssignment(doc: DocumentData): Apuesta {
    return {
      id: doc['id'].toString(),
      docId: doc['id'],
      idCircuit: doc['idCircuit'],
      idDriver: doc['idDriver'],
      betMoney: doc['betMoney'],
    };
  }

  addApuesta(apuesta: Apuesta) {
    const apuestaRef = collection(this.firestore, 'bets');
    return addDoc(apuestaRef, apuesta);
  }

  /*getApuestas(): Observable<Apuesta[]> {
    const apuestaRef = collection(this.firestore, 'bets');
    return collectionData(apuestaRef, { idField: 'id' }) as Observable<Apuesta[]>;
  }*/

  getApuestas() {
    return this._apuestasSubject.value;
  }

  subscribeToCollection(
    collectionName: string,
    subject: BehaviorSubject<Apuesta[]>,
    mapAssignment: (doc: DocumentData) => Apuesta
  ): () => void {
    const queryRef = query(collection(this.firestore, collectionName));

    const unsubscribe = onSnapshot(queryRef, (snapshot) => {
      const mappedData = snapshot.docs.map((doc) => {
        return mapAssignment({ ...doc.data(), id: doc.id });
      });

      subject.next(mappedData);
    });

    return unsubscribe;
  }

  deleteApuesta(apuesta: Apuesta) {
    const apuestaDoc = doc(this.firestore, `bets/${apuesta.id}`);
    return deleteDoc(apuestaDoc);
  }

  async procesarApuesta(apuesta: Apuesta): Promise<any> {
    const pilotoAleatorio = await this.driverSvc.getRandomDriver();
    var apuestaGanada = false;
    var dineroSuficiente = false;

    const dineroActual = await this.userSvc.getUserBetMoney();

    if (dineroActual! > apuesta.betMoney) {
      if (apuesta.idDriver === pilotoAleatorio.id) {
        // apuesta ganada
        this.userSvc.updateUserMoney(apuesta.betMoney * 23);
        apuestaGanada = true;
        console.log('Apuesta ganada');
      } else {
        // apuesta perdida
        this.userSvc.updateUserMoney(-apuesta.betMoney);
        apuestaGanada = false;
        dineroSuficiente = true;
        console.log('Apuesta perdida');
      }

      return { pilotoAleatorio, apuestaGanada, dineroSuficiente };
    } else {
      console.log('No hay dinero suficiente');
      return dineroSuficiente;
    } 
  }
}