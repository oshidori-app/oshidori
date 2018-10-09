import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable()
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  signUp(auth: { email: string; password: string }): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(auth.email, auth.password)
        .then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        });
    })
  }

  mailVerify(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.currentUser.sendEmailVerification()
        .then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        });
    })
  }

  isVerified() {
      return this.afAuth.auth.currentUser.emailVerified;
  }

  signIn(auth: { email: string; password: string }): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(auth.email, auth.password)
        .then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        });
    })
  }

  signOut() {
    return new Promise((resolve, reject) => {
      if (this.afAuth.auth.currentUser) {
        // this.afStore.firestore.disableNetwork();
        this.afAuth.auth.signOut()
          .then(() => {
            resolve();
          }).catch(err => {
            reject(err);
          });
      }
    })
  }

  getUser() {
    return this.afAuth.auth.currentUser;
  }
}