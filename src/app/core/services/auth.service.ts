import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
    this.setSessionData("prueba")
  }

  async init() {
    const storage = new Storage();
    await storage.create();
  }

  async setSessionData(data: any) {
    return this._storage?.set('sessionData', data);
  }

  async getSessionData(): Promise<any> {
    return this._storage?.get('sessionData');
  }

  async clearSessionData() {
    await this._storage?.remove('sessionData');
  }
}
