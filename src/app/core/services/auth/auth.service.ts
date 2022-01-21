import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { collection, doc, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
import { user } from 'rxfire/auth';
import { docData } from 'rxfire/firestore';
import { from, map, of, switchMap, tap } from 'rxjs';

import { User } from './../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private db: Firestore) { }

  login(email: string, password: string){
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  signup(email: string, password: string, payload: User){
    return from(createUserWithEmailAndPassword(this.auth, email, password))
      .pipe(
       tap((creds) => {
        //banco de dados para guardar o email e password
        payload.uid = creds.user.uid;

        const users = collection(this.db, 'users');
        const userDoc = doc(users, payload.uid)

        setDoc(userDoc, payload);
      })
    );
  }

  //observe se houve alterações no perfil cadastrado, por exemplo a foto de perfil. Se houver já faz as correções.
  get user() {
    return user(this.auth).pipe(
      switchMap((user) => {
        if(user){
          return this.getUserData(user.uid);
        }
        return of(undefined);
      })
    );
  }

  private getUserData(uid: string) {
    const users = collection(this.db, 'users');
    const userDoc = doc(users, uid);

    return docData(userDoc).pipe(
      map(
        (data) => ({ ...data, birthdate: data['birthdate'].toDate() } as User)
      )
    );
  }

  update(user:User) {
    const users = collection(this.db, 'users');
    const userDoc = doc(users, user.uid);

    return from(updateDoc(userDoc, user as any))
  }

  logout(){
    this.auth.signOut();
  }
}
