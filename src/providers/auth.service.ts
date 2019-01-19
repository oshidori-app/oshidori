import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Storage } from "@ionic/storage";

@Injectable()
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private storage: Storage) { }

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

  isVerified(): boolean {
      return this.afAuth.auth.currentUser.emailVerified;
  }

  signIn(auth: { email: string; password: string }): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(auth.email, auth.password)
        .then(res => {
          this.storage.set('userId', res.user.uid);
          resolve(res);
        }).catch(err => {
          reject(err);
        });
    })
  }

  signOut(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.afAuth.auth.currentUser) {
        // this.afStore.firestore.disableNetwork();
        this.afAuth.auth.signOut()
          .then(() => {
            this.storage.remove('userId');
            resolve();
          }).catch(err => {
            reject(err);
          });
      }
    })
  }

  resetPassword(email: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.sendPasswordResetEmail(email)
        .then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        });
    })
  }
  
  getUser() {
    return this.afAuth.auth.currentUser;
  }

  getUserId() {
    let userId = this.storage.get('userId');
    if (!userId) userId = null;
    return userId;
  }
}