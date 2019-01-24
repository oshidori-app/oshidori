import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Storage } from "@ionic/storage";
import { Logger } from "../logger";

@Injectable()
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private clientStorage: Storage) {
  }

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
          resolve(res);
        }).catch(err => {
          reject(err);
        });
    })
  }

  signOut(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.afAuth.auth.currentUser) {
        this.afAuth.auth.signOut()
          .then(() => {
            this.clientStorage.remove('groupRef')
              .then(() => {
                Logger.debug('groupRef deleted.');
                resolve();
              })
              .catch(err => reject(err));
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
}