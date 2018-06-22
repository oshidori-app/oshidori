import { Injectable } from '@angular/core';
import { Config } from '../config/config'
import { Logger } from './logger.service';
import * as sjcl from '../assets/vendor/sjcl';

declare const AWS: any;
declare const AWSCognito: any;

export enum UserState {
  SignedOut = 0,
  SignedIn = 1,
  PendingConfirmation = 2,
  InvalidCredentials = 3
}

// 後に移動
export var Gender = {
  Male: 0,
  Female: 1,
  Other: 2,
  [0]: "男性",
  [1]: "女性",
  [2]: "その他"
}

export interface IUserRegistration {
  username?: string;
  password?: string;
  gender?: string;
  birthDate?: string;
}

export interface IUserLogin {
  username?: string;
  password?: string;
}

interface IUserAttribute {
  Name: string;
  Value: string;
}

@Injectable()
export class CognitoUtil {

  private static _USER_POOL_ID = Config['USER_POOL_ID'];
  private static _CLIENT_ID: string = Config['CLIENT_ID'];
  private static _IDENTITY_POOL_ID: string = Config['IDENTITY_POOL_ID'];
  private static _REGION: string = Config['REGION'];


  public static getRegion(): string {
    return CognitoUtil._REGION;
  }

  public static getClientId(): string {
    return CognitoUtil._CLIENT_ID;
  }

  public static getIdentityPoolId(): string {
    return CognitoUtil._IDENTITY_POOL_ID;
  }

  public static getUserPoolId(): string {
    return CognitoUtil._USER_POOL_ID;
  }

  public static getCognitoIdentityId(): string {
    return AWS.config.credentials.identityId;
  }

  public static getUsername(): string {
    // Retrieve username from local storage. Return null if it does not exist
    return LocalStorage.get('userName');
  }

  public static setUsername(username: string) {
    LocalStorage.set('userName', username);
  }

  public static getUserId(): string {
    // Retrieve user ID from local storage. Return null if it does not exist
    return LocalStorage.get('userId');
  }

  public static getUserProfile(): Object {
    // Retrieve user profile attributes from local storage
    return LocalStorage.getObject('userProfile');
  }

  public static getUserGroup(): string {
    // Retrieve the user group from the local storage
    return LocalStorage.get("userGroup");
  }

  public static getUserState(): UserState {
    // Retrieve user state from local storage. Return null if it does not exist
    switch (parseInt(LocalStorage.get('userState'))) {
      case 0:
        return UserState.SignedOut;
      case 1:
        return UserState.SignedIn;
      case 2:
        return UserState.PendingConfirmation;
      case 3:
        return UserState.InvalidCredentials;
      default:
        return null;
    }
  };

  public static setUserState(userState: UserState) {
    LocalStorage.set('userState', JSON.stringify(userState));
  }

  public static getUserPool() {
    // Initialize Cognito User Pool
    let poolData: Object = {
      UserPoolId: CognitoUtil._USER_POOL_ID,
      ClientId: CognitoUtil._CLIENT_ID
    };
    AWSCognito.config.region = CognitoUtil._REGION;
    AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: CognitoUtil._IDENTITY_POOL_ID
    });

    // Set Cognito Identity Pool details
    AWS.config.region = CognitoUtil._REGION;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: CognitoUtil._IDENTITY_POOL_ID
    });

    // Initialize AWS config object with dummy keys - required if unauthenticated access is not enabled for identity pool
    AWSCognito.config.update({ accessKeyId: 'dummyvalue', secretAccessKey: 'dummyvalue' });
    return new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
  }

  public static getCognitoUser() {
    let username = LocalStorage.get('userName');

    let userData = {
      Username: username,
      Pool: CognitoUtil.getUserPool()
    };
    return new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
  }

  public static getCurrentUser() {
    return CognitoUtil.getUserPool().getCurrentUser();
  }
}

@Injectable()
export class UserRegistrationService {

  public static signUp(signUpData: IUserRegistration): Promise<void> {

    let attributeList: IUserAttribute[] = [];

    let dataGender: IUserAttribute = {
      Name: 'gender',
      Value: signUpData.gender
    };
    let dataBirthDate: IUserAttribute = {
      Name: 'birthdate',
      Value: signUpData.birthDate
    };

    let attributeGender = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataGender);
    let attributeBirthDate = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataBirthDate);

    attributeList.push(attributeGender);
    attributeList.push(attributeBirthDate);

    let promise: Promise<void> = new Promise<void>((resolve, reject) => {
      CognitoUtil.getUserPool().signUp(signUpData.username, signUpData.password, attributeList, undefined, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        console.log('Username is ' + result.user.getUsername());
        console.log('Sign-up successful!');

        // Update user state to 'pendingConfirmation'
        CognitoUtil.setUsername(signUpData.username);
        CognitoUtil.setUserState(UserState.PendingConfirmation);

        // Sign-up successful. Callback without error.
        resolve();
      });
    });
    return promise;
  }

  public static confirmSignUp(confirmationCode: string): Promise<void> {
    let cognitoUser = CognitoUtil.getCognitoUser();
    let promise: Promise<void> = new Promise<void>((resolve, reject) => {
      cognitoUser.confirmRegistration(confirmationCode, true, (err: Error, data: any) => {
        if (err) {
          reject(err);
          return;
        }
        CognitoUtil.setUserState(UserState.SignedIn);
        resolve(data);
      });
    });
    return promise;
  }

  public static resendConfirmationCode(): Promise<void> {
    let cognitoParams = {
      ClientId: CognitoUtil.getClientId(),
      Username: CognitoUtil.getUsername()
    };

    let promise: Promise<void> = new Promise<void>((resolve, reject) => {
      new AWSCognito.CognitoIdentityServiceProvider().resendConfirmationCode(cognitoParams, (err: Error, data: any) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(data);
      });
    });
    return promise;
  }
}

@Injectable()
export class UserLoginService {
  private static _userTokens = {
    accessToken: undefined,
    idToken: undefined,
    refreshToken: undefined
  };

  public static getAccessToken() {
    let accessToken: string = UserLoginService._userTokens.accessToken;
    if (!accessToken) {
      // retrieve from Local Storage if it exists
      accessToken = LocalStorage.get('userTokens.accessToken');
      UserLoginService._userTokens.accessToken = accessToken;
    }
    return accessToken;
  };

  public static getIdToken() {
    let idToken: string = UserLoginService._userTokens.idToken;
    if (!idToken) {
      // retrieve from Local Storage if it exists
      idToken = LocalStorage.get('userTokens.idToken');
      UserLoginService._userTokens.idToken = idToken;
    }
    return idToken;
  };

  public static getRefreshToken() {
    let refreshToken: string = UserLoginService._userTokens.refreshToken;
    if (!refreshToken) {
      // retrieve from Local Storage if it exists
      refreshToken = LocalStorage.get('userTokens.refreshToken');
      UserLoginService._userTokens.refreshToken = refreshToken;
    }
    return refreshToken;
  }

  public static getAwsAccessKey() {
    if (AWS.config.credentials == null) {
      return LocalStorage.get('userTokens.awsAccessKeyId');
    }
    return AWS.config.credentials.accessKeyId || LocalStorage.get('userTokens.awsAccessKeyId');
  }

  public static getAwsSecretAccessKey() {
    return AWS.config.credentials.secretAccessKey || LocalStorage.get('userTokens.awsSecretAccessKey');
  }

  public static getAwsSessionToken() {
    return AWS.config.credentials.sessionToken || LocalStorage.get('userTokens.awsSessionToken');
  }

  private static clearUserState() {
    // Clear user tokens
    UserLoginService._userTokens = {
      accessToken: undefined,
      idToken: undefined,
      refreshToken: undefined
    };

    LocalStorage.set('userTokens.accessToken', null);
    LocalStorage.set('userTokens.idToken', null);
    LocalStorage.set('userTokens.refreshToken', null);
    LocalStorage.set('userTokens.awsAccessKeyId', null);
    LocalStorage.set('userTokens.awsSecretAccessKey', null);
    LocalStorage.set('userTokens.awsSessionToken', null);

    // Clear user state
    CognitoUtil.setUserState(UserState.SignedOut);

    // Clear user profile attributes
    LocalStorage.set('userProfile', null);

    // Clear username and user ID attributes
    LocalStorage.set('userId', null);
    LocalStorage.set('userName', null);
  };

  public static signIn(userLogin: IUserLogin): Promise<void> {
    let authenticationData = {
      Username: userLogin.username,
      Password: userLogin.password
    };

    let authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);

    // Set user name
    CognitoUtil.setUsername(userLogin.username);
    console.log('Authenticating user ' + userLogin.username);

    let cognitoUser = CognitoUtil.getCognitoUser();
    let promise: Promise<void> = new Promise<void>((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
          console.debug(result);
          /* 
           IDトークン、アクセストーク：ン、更新トークンをjwtトークンとして取り出し、ローカルストレージに保存する
              * [IDトークン]：ユーザIDなどcognitoに登録したユーザ情報が格納される。これはクライアントで参照可能。
                  * デフォルトでは1時間で有効期限が切れる 
              * [アクセストークン]：一部のユーザ情報が格納されるが、ユーザープールのユーザーのコンテキストで操作を許可するためのもの。
                  * デフォルトでは1時間で有効期限が切れる 
              * [更新トークン]：新しいアクセストークンまたは ID トークンを取得するため Amazon Cognito に対してのみ使用する
                 * デフォルトでは1時間で有効期限が切れる 
          */
          UserLoginService._userTokens.accessToken = result.getAccessToken().getJwtToken();
          UserLoginService._userTokens.idToken = result.getIdToken().getJwtToken();
          UserLoginService._userTokens.refreshToken = result.getRefreshToken().getToken();
          LocalStorage.set('userTokens.idToken', UserLoginService._userTokens.idToken);
          console.log('%cCognito User Pools Identity Token: ', Logger.LeadInStyle, UserLoginService.getIdToken());
          LocalStorage.set('userTokens.accessToken', UserLoginService._userTokens.accessToken);
          console.log('%cCognito User Pools Access Token: ', Logger.LeadInStyle, UserLoginService.getAccessToken());
          LocalStorage.set('userTokens.refreshToken', UserLoginService._userTokens.refreshToken);
          console.log('%cCognito User Pools Refresh Token: ', Logger.LeadInStyle, UserLoginService.getRefreshToken());

          /*
            IDトークンを展開してuser groupを取得する。
            Jwt形式のトークンなので、ヘッダー、ペイロード、署名の3部分に分割できる。
            IDトークンのペイロードを取得し、base64デコードする。その後ユーザグループを取得する。
           */
          let idTokenPayload = UserLoginService._userTokens.idToken.split('.')[1];
          let payload = JSON.parse(sjcl.codec.utf8String.fromBits(sjcl.codec.base64url.toBits(idTokenPayload)));
          let userGroup = payload["cognito:groups"];
          /*
            ユーザグループは権限分けに使用する予定。
            現状は"clientGroup"を自動割当。
          */
          if (userGroup && userGroup.length > 0) {
            LocalStorage.set('userGroup', userGroup);
          } else {
            userGroup = 'clientGroup';
            LocalStorage.set('userGroup', userGroup);
          }
          console.log('%cCognito User Pools User Groups :' + '%c%s belongs to group %s', Logger.LeadInStyle, "black",
            userLogin.username, userGroup);

          /*
            ユーザのIDはメールアドレスだが、内部的にはCognitoで発行されるIDを利用する
          */
          CognitoUtil.setUsername(payload['cognito:username']);

          // ユーザの状態を保存する
          CognitoUtil.setUserState(UserState.SignedIn);

          // ユーザの属性情報を取得する
          UserProfileService.getUserAttributes().then(() => {
            UserLoginService.getAwsCredentials().then(() => {
              LocalStorage.set('userId', CognitoUtil.getCognitoIdentityId());
              console.log('%cCognito Identity ID: ', Logger.LeadInStyle, CognitoUtil.getCognitoIdentityId());
              LocalStorage.set('userTokens.awsAccessKeyId', AWS.config.credentials.accessKeyId);
              console.log('%cAWS Access Key ID: ', Logger.LeadInStyle, AWS.config.credentials.accessKeyId);
              LocalStorage.set('userTokens.awsSecretAccessKey', AWS.config.credentials.secretAccessKey);
              console.log('%cAWS Secret Access Key: ', Logger.LeadInStyle, AWS.config.credentials.secretAccessKey);
              LocalStorage.set('userTokens.awsSessionToken', AWS.config.credentials.sessionToken);
              console.log('%cAWS Session Token: ', Logger.LeadInStyle, AWS.config.credentials.sessionToken);
            });
            resolve();
          }).catch((err) => {
            reject(err);
          });
        },
        onFailure: function (err) {
          // Check for user not confirmed exception
          if (err.code === 'UserNotConfirmedException') {
            // Set user state to pending confirmation
            CognitoUtil.setUserState(UserState.PendingConfirmation);
          } else {
            CognitoUtil.setUserState(UserState.InvalidCredentials);
          }
          reject(err);
        }
      });
    });
    return promise;
  }

  public static signOut() {
    // ユーザの認証状態をクリア
    UserLoginService.clearUserState();
    // Cognitoからサインアウト
    CognitoUtil.getCognitoUser().signOut();
    AWS.config.credentials.clearCachedId();
  }

  public static globalSignOut() {
    // ユーザの認証状態をクリア
    UserLoginService.clearUserState();
    // Cognitoからサインアウト。デバイスごとに認証状態を分けていた場合も、全てサインアウトする
    CognitoUtil.getCognitoUser().globalSignOut();
    AWS.config.credentials.clearCachedId();
  }

  public static changePassword(previousPassword: string, proposedPassword: string): Promise<void> {
    let promise: Promise<void> = new Promise<void>((resolve, reject) => {
      // first, load the valid tokens cached in the local store, if they are available
      // see: https://github.com/aws/amazon-cognito-identity-js/issues/71
      let cognitoUser = CognitoUtil.getCognitoUser();
      cognitoUser.getSession((err: Error, session: any) => {
        if (err) {
          reject(err);
          return;
        }
        cognitoUser.changePassword(previousPassword, proposedPassword, (err: Error, result: any) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(result);
        });
      });
    });
    return promise;
  }

  public static forgotPassword(username: string): Promise<void> {
    // Set target username
    CognitoUtil.setUsername(username);

    // Get Cognito User with session
    let cognitoUser = CognitoUtil.getCognitoUser();

    let promise: Promise<void> = new Promise<void>((resolve, reject) => {
      cognitoUser.forgotPassword({
        onSuccess: (result) => {
          console.log('Initiated reset password for username ' + username);
          resolve(result);
        },
        onFailure: (err) => {
          console.log('Failed to initiate reset password for username ' + username);
          reject(err);
          return;
        }
      });
    });
    return promise;
  }

  public static confirmForgotPassword(username: string, verificationCode: string, password: string): Promise<void> {
    // Set target username
    CognitoUtil.setUsername(username);

    // Get Cognito User with session
    let cognitoUser = CognitoUtil.getCognitoUser();

    let promise: Promise<void> = new Promise<void>((resolve, reject) => {
      cognitoUser.confirmPassword(verificationCode, password, {
        onSuccess: (result) => {
          console.log('Password successfully reset for username ' + username);
          resolve(result);
        },
        onFailure: (err) => {
          console.log('Password was not reset for username ' + username);
          console.log(`Error: ${err.name}. ${err.message}`);
          reject(err);
          return;
        }
      });
    });
    return promise;
  }

  public static getAwsCredentials(): Promise<void> {
    // TODO: Integrate this method as needed into the overall module
    let logins = {};

    let promise: Promise<void> = new Promise<void>((resolve, reject) => {
      // Check if user session exists
      CognitoUtil.getCognitoUser().getSession((err: Error, result: any) => {
        if (err) {
          reject(err);
          return;
        }


        logins['cognito-idp.' + CognitoUtil.getRegion() + '.amazonaws.com/' + CognitoUtil.getUserPoolId()] = result.getIdToken().getJwtToken();

        // Add the User's Id token to the Cognito credentials login map
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: CognitoUtil.getIdentityPoolId(),
          Logins: logins
        });

        // Call refresh method to authenticate user and get new temp AWS credentials
        if (AWS.config.credentials.needsRefresh()) {
          AWS.config.credentials.clearCachedId();
          AWS.config.credentials.get((err) => {
            if (err) {
              reject(err);
              return;
            }
            resolve();
          });
        } else {
          AWS.config.credentials.get((err) => {
            if (err) {
              console.error(err);
              reject(err);
              return;
            }
            resolve();
          });
        }
      });
    });
    return promise;
  }
}

export class UserProfileService {
  public static getUserAttributes() {
    let promise: Promise<Object> = new Promise<Object>((resolve, reject) => {
      let cognitoUser = CognitoUtil.getCognitoUser();
      cognitoUser.getSession((err: Error, session: any) => {
        if (err) {
          reject(err);
          return;
        }
        cognitoUser.getUserAttributes((err: Error, result: any) => {
          if (err) {
            reject(err);
            return;
          }
          let userAttributes = {};

          for (var i = 0; i < result.length; i++) {
            userAttributes[result[i].getName()] = result[i].getValue();
          }
          console.log('%cCognito User Pools User Attributes: ', Logger.LeadInStyle, userAttributes);
          // Write user profile attributes to local storage
          LocalStorage.setObject('userProfile', userAttributes);
          resolve(userAttributes);
        });
      })
    });
    return promise;
  }
}

@Injectable()
export class LocalStorage {

  private static getLocalStorage() {
    let storage = window.localStorage || localStorage;
    if (!localStorage) {
      throw new Error('Browser does not support local storage');
    }
    return storage;
  }

  public static set(key: string, value: string): void {
    LocalStorage.getLocalStorage().setItem(key, value);
  }

  public static get(key: string): string {
    return LocalStorage.getLocalStorage().getItem(key);
  }

  public static setObject(key: string, value: any): void {
    LocalStorage.set(key, JSON.stringify(value));
  }

  public static getObject(key: string): any {
    return JSON.parse(LocalStorage.get(key) || '{}');
  }

  public static remove(key: string): any {
    LocalStorage.getLocalStorage().removeItem(key);
  }
}
export const LOCAL_STORAGE_PROVIDERS: any[] = [
  { provide: LocalStorage, useClass: LocalStorage }
];
