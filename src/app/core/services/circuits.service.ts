import { Injectable } from '@angular/core';
import { DocumentData, DocumentReference, Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import Circuit from '../interfaces/circuit.interface';
import { Observable, from } from 'rxjs';
import Apuesta from '../interfaces/apuesta.interface';
import { FirebaseService } from './firebase/firebase-service';
import { Storage, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class CircuitsService {

  constructor(
    private firestore: Firestore,
    private firebase: FirebaseService,
    private storage: Storage
    ) { }

  async addCircuit(circuit: Circuit) {
    var _circuit = {
      id:circuit.id ?? '',
      nameCircuit:circuit.nameCircuit,
      country:circuit.country,
      laps:circuit.laps,
      length:circuit.length,
      picture:circuit.picture
    };
    const circuitRef = collection(this.firestore, 'circuit');
    // subir img
    if (circuit.pictureFile) {
      try {
        var id = await this.uploadImage(circuit.pictureFile);
        _circuit.picture = id;
      } catch (uploadError) {
        console.log('Error al subir la imagen', uploadError);
      }
    }
    return addDoc(circuitRef, _circuit);
  }

  getCircuits(): Observable<Circuit[]>{
    const circuitRef = collection(this.firestore, 'circuit');
    return collectionData(circuitRef, { idField: 'id' }) as Observable<Circuit[]>;
  }

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

  deleteCircuit(circuit: Circuit) {
    const circuitDocRef = doc(this.firestore, `circuit/${circuit.id}`);
    return deleteDoc(circuitDocRef);
  }

  async updateCircuit(circuit: Circuit) {
    var _circuit = {
      id:circuit.id ?? '',
      nameCircuit:circuit.nameCircuit,
      country:circuit.country,
      laps:circuit.laps,
      length:circuit.length,
      picture:circuit.picture
    };
    if (circuit.pictureFile) {
      try {
        var id = await this.uploadImage(circuit.pictureFile);
        _circuit.picture = id;
      } catch (uploadError) {
        console.log('Error al subir la imagen', uploadError);
      }
    }
    try {
      await updateDoc(doc(this.firestore, 'circuit', _circuit.id), _circuit);
    } catch (error) {
      console.log(error);
    }
  }

  public async uploadImage(file: Blob): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const storageRef = ref(this.storage, 'f1Bets-images/' + Date.now() + '.jpg');
        await uploadBytes(storageRef, file);
        const downloadUrl = await getDownloadURL(storageRef);
        resolve(downloadUrl);
      } catch (error) {
        reject(error);
      }
    });
  }

}
