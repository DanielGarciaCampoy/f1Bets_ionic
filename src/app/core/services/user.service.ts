import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserCredential, signOut } from 'firebase/auth';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { User, UserLogin, UserRegister } from '../models/user.model';
import { FirebaseService } from './firebase/firebase-service';
import { LocalStorageService } from './local-storage.service';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { DocumentData, Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc, getDocs, query, setDoc, where } from '@angular/fire/firestore';
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
        const userDocRef = doc(userCollection, _user.user.uid);

        await setDoc(userDocRef, {
          uid: _user.user.uid,
          userName: data.userName,
          email: data.email,
          picture: "",
          password: "",
          betMoney: 100,
          admin: false
        });

        resolve(_user.user.uid);
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
            picture: user['picture'],
            admin: user['admin']
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
      userName: user.userName
    };
    try {
      await updateDoc(doc(this.firestore, 'user', _user.uid), _user);
    } catch (error) {
      console.log(error);
    }
  }

  async getUserBetMoney(): Promise<number | null> {
    const user = this.auth.currentUser;

    if (user) {
      const userDoc = await getDoc(doc(this.firestore, 'user', user.uid));

      if (userDoc.exists()) {
        return userDoc.data()['betMoney'];
      }
    }

    return null;
  }

  async updateUserMoney(betMoney: number): Promise<void> {
    const user = this.auth.currentUser;

    /*const dineroActual = await this.getUserBetMoney().toPromise();

    const dineroActualizado = dineroActual! + betMoney;*/

    const dineroActual = await this.getUserBetMoney();

    var _user = {
      uid: user?.uid ?? '',
      betMoney: dineroActual! + betMoney
    };
  
    try {
      await updateDoc(doc(this.firestore, 'user', _user.uid), _user);
    } catch (error) {
      console.log(error);
    }

  }

  public async toggleAdmin() {
    const currentUser = await this.getUser()
      .pipe(take(1))
      .toPromise();
  
    if (currentUser && 'admin' in currentUser) {
      const adminContrario = !currentUser.admin;
  
      await updateDoc(doc(this.firestore, 'user', currentUser.uid), { admin: adminContrario });
      currentUser.admin = adminContrario;
  
      this._user.next(currentUser);
    }
  }
}