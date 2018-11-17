import { AccountPage } from '../pages/account/account';
import { AccountSigninPage } from './../pages/account-signin/account-signin';
import { AccountForgotPasswordPage } from './../pages/account-forgot-password/account-forgot-password';
import { AccountChangePasswordPage } from './../pages/account-change-password/account-change-password';
import { AccountSignupPage } from '../pages/account-signup/account-signup';
import { AccountConfirmationCodePage } from '../pages/account-confirmation-code/account-confirmation-code';

import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { Camera } from '@ionic-native/camera';
import { MyApp } from './app.component';
import { HttpModule } from "@angular/http";

import { TasksCreatePage } from '../pages/tasks-create/tasks-create';
import { RankingPage } from '../pages/ranking/ranking';
import { HomePageModule } from '../pages/home/home.module';
import { TabsPage } from '../pages/tabs/tabs';
import { KeepListPageModule } from '../pages/keep-list/keep-list.module';
import { KeepPage } from '../pages/keep/keep';
import { InputKeepPage } from '../pages/input-keep/input-keep';
import { InputTaskPage } from '../pages/input-task/input-task';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpService } from '../providers/http-service';
import { AuthService } from '../providers/auth.service';
import { DisplayUtilService } from '../providers/display-util.service';
import { Logger } from '../providers/logger.service';
import { KeepAddDevPage } from '../pages/keep-add-dev/keep-add-dev';
import { TestRegistrationPage } from '../pages/test-registration/test-registration';

// firebase
import { environment } from "../environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";

// dataStore
import { StoreService } from '../providers/store.service';
import { StorageService } from '../providers/storage.service';
import { UserRepository } from '../repository/user.repository';
import { TaskRepository } from '../repository/task.repository';
import { TestRepository } from '../repository/test.repository';
import { TestListPage } from '../pages/test-list/test-list';
import { AngularFireStorageModule } from '@angular/fire/storage';

@NgModule({
  declarations: [
    MyApp,
    AccountPage,
    AccountSignupPage,
    AccountSigninPage,
    AccountConfirmationCodePage,
    AccountChangePasswordPage,
    AccountForgotPasswordPage,
    KeepAddDevPage,
    TasksCreatePage,
    RankingPage,
    TabsPage,
    KeepPage,
    InputTaskPage,
    InputKeepPage,
    TestRegistrationPage,
    TestListPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    HomePageModule,
    KeepListPageModule,
    AngularFireStorageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AccountPage,
    AccountSignupPage,
    AccountSigninPage,
    AccountConfirmationCodePage,
    AccountChangePasswordPage,
    AccountForgotPasswordPage,
    KeepAddDevPage,
    TasksCreatePage,
    RankingPage,
    TabsPage,
    KeepPage,
    InputTaskPage,
    InputKeepPage,
    TestRegistrationPage,
    TestListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Camera,
    AuthService,
    DisplayUtilService,
    StoreService,
    StorageService,
    UserRepository,
    TaskRepository,
    TestRepository,
    Logger,
    { provide: HttpService, useClass: HttpService }
  ]
})
export class AppModule { }