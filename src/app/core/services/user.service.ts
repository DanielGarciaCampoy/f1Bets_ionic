import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserCredential, signOut } from 'firebase/auth';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User, UserLogin, UserRegister } from '../models/user.model';
import { FirebaseService } from './firebase/firebase-service';
import { LocalStorageService } from './local-storage.service';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { DocumentData, Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDocs, query, where } from '@angular/fire/firestore';
import { updateDoc } from 'firebase/firestore';



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
    private router: Router,
    private firestore: Firestore
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

  register(data:UserRegister) {
    return new Promise<string>(async (resolve, reject)=>{
      try {
        var _user:UserCredential = await createUserWithEmailAndPassword(this.auth, data.email, data.password);
        
        const userCollection = collection(this.firestore, 'user');
        const userDocRef = await addDoc(userCollection, {
        uid: _user.user.uid,
        userName: data.userName,
        email: data.email,
        picture: "",
        password: "",
        betMoney: 100
      });

      resolve(userDocRef.id);
      } catch(error) {
        reject(error);
      }
    }); 
    
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

  async deleteAccount() {
    try {
      const user = this.auth.currentUser;
      if (user) {
        // eliminar documento
        const userQuery = await getDocs(query(collection(this.firestore, 'user'), where('uid', '==', user.uid)));

        const userDoc = userQuery.docs[0];
        deleteDoc(doc(this.firestore, 'user', userDoc.id));

        // eliminar cuenta
        await user.delete();
        
        console.log('Cuenta eliminada');
        this.router.navigate(['/login'], {replaceUrl:true});
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  public getUser(): Observable<User | null> {
    const userRef = collection(this.firestore, 'user');
    const uid = this.auth.currentUser?.uid;

    const userQuery = query(userRef, where('uid', '==', uid));
    return collectionData(userQuery, { idField: 'id' }).pipe(
      map((users: (DocumentData | (DocumentData & { id: string; }))[]) => {
        if (users.length > 0) {
          const user = users[0];
          return {
            uid: user['uid'],
            userName: user['userName'],
            email: user['email'],
            betMoney: user['betMoney'],
            picture: user['picture']
          } as User;
        } else {
          return null;
        }
      })
    );
  }

  async updateUser(user: User) {
    var _user = {
      uid: user.uid ?? '',
      username: user.userName
    };
    try {
      await updateDoc(doc(this.firestore, 'user', _user.uid), _user);
    } catch (error) {
      console.log(error);
    }
  }

}
