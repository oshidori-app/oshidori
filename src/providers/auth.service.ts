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


  /**
   * emailとpasswordでユーザを登録します
   *
   * @param {{ email: string; password: string }} auth
   * @returns {Promise<any>}
   * @memberof AuthService
   */
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


  /**
   * ユーザ存在確認のeメールを送信します
   *
   * @returns {Promise<any>}
   * @memberof AuthService
   */
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


  /**
   * emailでのユーザ存在確認が完了しているか否かを返却します
   *
   * @returns {boolean}
   * @memberof AuthService
   */
  isVerified(): boolean {
    return this.afAuth.auth.currentUser.emailVerified;
  }


  /**
   * emailとpasswordを使用してユーザ認証を行います
   *
   * @param {{ email: string; password: string }} auth
   * @returns {Promise<any>}
   * @memberof AuthService
   */
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


  /**
   * ユーザ認証情報を削除します
   *
   * @returns {Promise<any>}
   * @memberof AuthService
   */
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

  /**
   * 指定したemailアドレスに、パスワードをリセットのためのメールを送信します
   *
   * @param {string} email
   * @returns {Promise<any>}
   * @memberof AuthService
   */
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


  /**
   * 認証情報の確認を行います
   *
   * @param {*} nextOrObserver
   * @returns {firebase.Unsubscribe}
   * @memberof AuthService
   */
  onAuthStateChanged(nextOrObserver): firebase.Unsubscribe {
    return this.afAuth.auth.onAuthStateChanged(nextOrObserver);
  }

  /**
   * 現在サインイン中のユーザ情報を返却します
   *
   * @returns
   * @memberof AuthService
   */
  getUser() {
    return this.afAuth.auth.currentUser;
  }
}