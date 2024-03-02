import { Injectable } from '@angular/core';
import { DocumentData, DocumentReference, Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import Driver from '../interfaces/driver.interface';
import { Observable, from, map } from 'rxjs';
import Apuesta from '../interfaces/apuesta.interface';
import { FileUploaded, FirebaseService } from './firebase/firebase-service';
import { Storage, getDownloadURL, listAll, ref, uploadBytes } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class DriversService {

  constructor(
    private firestore: Firestore,
    private firebase: FirebaseService,
    private storage: Storage) {}

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
        var driver = await this.firebase.getDocument('driver', id);
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

  deleteDriver(driver: Driver) {
    const driverDocRef = doc(this.firestore, `driver/${driver.id}`);
    return deleteDoc(driverDocRef);
  }

  async updateDriver(driver: Driver) {
    var _driver = {
      id: driver.id ?? '',
      name:driver.name,
      team:driver.team,
      yearBirth:driver.yearBirth,
      picture:driver.picture
    };
    if (driver.pictureFile) {
      try {
        var id = await this.uploadImage(driver.pictureFile);
        _driver.picture = id;
      } catch (uploadError) {
        console.log('Error al subir la imagen', uploadError);
      }
    }
    try {
      // await this.firebase.updateDocument('driver',_driver.id,_driver);
      await updateDoc(doc(this.firestore, 'driver', _driver.id), _driver);
    } catch (error) {
      console.log(error);
    }
  }

  /*uploadImage(file: any):Promise<any>{  
    return new Promise(async (resolve, reject)=>{
      try {
        const data = await this.firebase.imageUpload(file);  
        resolve(data);
      } catch (error) {
        resolve(error);
      }
    });
  }*/

  async uploadImage($event: any): Promise<string | undefined> {
    const file = $event.target.files[0];
    console.log(file);
  
    const imgRef = ref(this.storage, `f1Bets-images/${file.name}`);
  
    try {
      await uploadBytes(imgRef, file);
      const downloadURL = await getDownloadURL(imgRef);
      this.getImages();
      return downloadURL;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  images!: string[];

  getImages() {
    const imagesRef = ref(this.storage, 'images');

    listAll(imagesRef)
      .then(async response => {
        console.log(response);
        this.images = [];
        for (let item of response.items) {
          const url = await getDownloadURL(item);
          this.images.push(url);
        }
      })
      .catch(error => console.log(error));
  }

}
