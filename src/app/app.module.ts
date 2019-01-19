import { CommentRepository } from '../repository/comment.repository';
import { ErrorHandler, NgModule } from '@angular/core';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule } from '@angular/fire/storage';
import { HttpModule } from "@angular/http";
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicImageLoader } from 'ionic-image-loader';
import { environment } from "../environments/environment";
import { AccountConfirmationCodePage } from '../pages/account-confirmation-code/account-confirmation-code';
import { AccountSignupPage } from '../pages/account-signup/account-signup';
import { AccountPage } from '../pages/account/account';
import { DevMenuPage } from '../pages/develop/develop-menu';
import { HomePageModule } from '../pages/home/home.module';
import { InputKeepPage } from '../pages/input-keep/input-keep';
import { KeepAddDevPage } from '../pages/keep-add-dev/keep-add-dev';
import { KeepPage } from '../pages/keep/keep';
import { RankingPage } from '../pages/ranking/ranking';
import { TabsPage } from '../pages/tabs/tabs';
import { TasksCreatePage } from '../pages/tasks-create/tasks-create';
import { TestListPage } from '../pages/test-list/test-list';
import { SubTestRegistrationPage } from '../pages/test-registration/sub-test-registration';
import { TestMultiRegistrationPage } from '../pages/test-registration/test-multi-registration';
import { TestRegistrationPage } from '../pages/test-registration/test-registration';
import { AuthService } from '../providers/auth.service';
import { DisplayUtilService } from '../providers/display-util.service';
import { HttpService } from '../providers/http-service';
import { ImagePickerService } from '../providers/image-picker.service';
import { StorageService } from '../providers/storage.service';
import { StoreService } from '../providers/store.service';
import { GroupRepository } from '../repository/group.repository';
import { KeepRepository } from '../repository/keep.repository';
import { SubTestRepository } from '../repository/sub-test.repository';
import { TaskRepository } from '../repository/task.repository';
import { TestRepository } from '../repository/test.repository';
import { UserRepository } from '../repository/user.repository';
import { AccountChangePasswordPage } from './../pages/account-change-password/account-change-password';
import { AccountForgotPasswordPage } from './../pages/account-forgot-password/account-forgot-password';
import { AccountSigninPage } from './../pages/account-signin/account-signin';
import { MyApp } from './app.component';
import { ComponentsModule } from '../components/components.module';
import { KeepListPage } from '../pages/keep-list/keep-list';
import { InputTaskPage } from '../pages/input-task/input-task';
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
        KeepListPage,
        InputKeepPage,
        InputTaskPage,
        TestRegistrationPage,
        TestMultiRegistrationPage,
        TestListPage,
        SubTestRegistrationPage,
        DevMenuPage
    ],
    imports: [
        HttpModule,
        BrowserModule,
        IonicModule.forRoot(MyApp),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        HomePageModule,
        AngularFireStorageModule,
        IonicImageLoader.forRoot(),
        IonicStorageModule.forRoot(),
        ComponentsModule
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
        KeepListPage,
        InputKeepPage,
        InputTaskPage,
        TestRegistrationPage,
        TestMultiRegistrationPage,
        TestListPage,
        SubTestRegistrationPage,
        DevMenuPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        Camera,
        ImagePicker,
        AuthService,
        DisplayUtilService,
        ImagePickerService,
        StoreService,
        StorageService,
        UserRepository,
        TaskRepository,
        TestRepository,
        KeepRepository,
        SubTestRepository,
        GroupRepository,
        CommentRepository,
        { provide: HttpService, useClass: HttpService }
    ]
})

export class AppModule { }
