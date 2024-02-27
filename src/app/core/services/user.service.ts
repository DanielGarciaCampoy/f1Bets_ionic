import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserCredential, signOut } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';
import { User, UserLogin, UserRegister } from '../models/user.model';
import { FirebaseService } from './firebase/firebase-service';
import { LocalStorageService } from './local-storage.service';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private _isLogged = new BehaviorSubject<boolean>(false);
  public isLogged$ = this._isLogged.asObservable();
  private _user = new BehaviorSubject<User>(null!);
  public user$ = this._user.asObservable();
  
  private user!: User;

  constructor(
    private auth: Auth,
    private firebase: FirebaseService,
    private router: Router
  ) {
    // this.init();
  }

  private async init() {
    this.firebase.isLogged$.subscribe(async (logged) => {
      if (logged) {
        this._user.next((await this.firebase.getDocument('user', this.firebase.getUser().uid)).data as User);
        this.router.navigate(['tabs/home']);
      }
      this._isLogged.next(logged);
    });
  }

  register({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login({ email, password }: any) {
    this._isLogged.next(true);
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logOut() {
    return signOut(this.auth)
    .then(response => {
      // this._isLogged.next(false)
      // console.log(response);
      this.router.navigate(['/login'], {replaceUrl:true});
    })
    .catch(error => console.log(error))
  }

  public getUser() {
    return this.user;
  }

}
