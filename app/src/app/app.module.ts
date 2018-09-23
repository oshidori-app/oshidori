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
import { AboutPage } from '../pages/about/about';
import { RankingPage } from '../pages/ranking/ranking';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { InputPanelPage } from '../pages/input-panel/input-panel';
import { KeepListPage } from '../pages/keep-list/keep-list';
import { KeepPage } from '../pages/keep/keep';
import { InputKeepPage } from '../pages/input-keep/input-keep';
import { InputTaskPage } from '../pages/input-task/input-task';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpService } from '../providers/http-service';
import { CustomAuthorizerClient, IamAuthorizerClient, UserPoolsAuthorizerClient, NoAuthorizationClient } from '../providers/oshidori-api.service';
import { KeepAddDevPage } from '../pages/keep-add-dev/keep-add-dev';

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
    AboutPage,
    RankingPage,
    HomePage,
    TabsPage,
    KeepPage,
    InputPanelPage,
    KeepListPage,
    InputTaskPage,
    InputKeepPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
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
    AboutPage,
    RankingPage,
    HomePage,
    TabsPage,
    KeepPage,
    InputPanelPage,
    KeepListPage,
    InputTaskPage,
    InputKeepPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Camera,
    { provide: HttpService, useClass: HttpService },
    { provide: CustomAuthorizerClient, useClass: CustomAuthorizerClient },
    { provide: IamAuthorizerClient, useClass: IamAuthorizerClient },
    { provide: UserPoolsAuthorizerClient, useClass: UserPoolsAuthorizerClient },
    { provide: NoAuthorizationClient, useClass: NoAuthorizationClient },
  ]
})
export class AppModule { }

declare var AWS;
AWS.config.customUserAgent = AWS.config.customUserAgent + ' Ionic';
