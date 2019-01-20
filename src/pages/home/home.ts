import { Observable } from 'rxjs';
import { StorageService } from './../../providers/storage.service';
import { TaskRepository } from './../../repository/task.repository';
import { InputTaskPage } from './../input-task/input-task';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { KeepListPage } from '../keep-list/keep-list';
import { Platform } from 'ionic-angular';
import { Task } from '../../models/task';
import { AccountPage } from '../account/account';
import { TestRegistrationPage } from '../test-registration/test-registration';
import { TestListPage } from '../test-list/test-list';
import { Logger } from '../../logger';
import { DisplayUtilService } from '../../providers/display-util.service';
import { Subscription } from 'rxjs';
import { ImageAttribute } from 'ionic-image-loader'
import { Storage } from '@ionic/storage';

export class TaskListVm {
    title?: string;
    done?: boolean;
    imgUrl?: string;
    DownloadUrl?: Observable<string>;
}
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage {

    public taskListVms: TaskListVm[];
    public formatedTaskList: any[];
    public taskInfoVisible = false;
    public platformWidth = 0;
    public imageAttributes: ImageAttribute[] = [];
    private listSubscription: Subscription;

    constructor(
        public navCtrl: NavController,
        public platform: Platform,
        private taskRepo: TaskRepository,
        private clientStorage: Storage,
        private dutil: DisplayUtilService,
        private strage: StorageService
    ) {
        // デバイスの画面幅を取得
        this.platformWidth = platform.width();
        this.imageAttributes.push({
            element: 'class',
            value: 'task-img'
        })
    }

    ionViewDidEnter() {
        Logger.debug("ionViewWillEnter: HomePage");
        this.dutil.showLoader("データを読み込んでいます...");
        this.getTasks();
    }

    ionViewDidLeave() {
        if (this.listSubscription) this.listSubscription.unsubscribe();
    }

    private getTasks() {
        this.clientStorage.get('groupRef')
            .then(val => {
                let task = new Task({
                    parentRef: val
                });
                this.listSubscription = this.taskRepo.list(task).subscribe(taskList => {
                    Logger.debug(taskList);
                    this.taskListVms = taskList;
                    taskList.forEach((task, i) => {
                        let DownloadUrl = this.strage.getDownloadURL(task.imgUrl);
                        this.taskListVms[i].DownloadUrl = DownloadUrl
                    })
                    return this.formatedTaskList = this.formatedArrayForView(2, this.taskListVms)
                })
            })
            .catch(err => {
                Logger.error(err);
            })
    }

    formatedArrayForView(xNum: number, array: any[]) {
        let ret = [];
        for (let i = 0; i < Math.ceil(array.length / xNum); i++) {
            var index = i * xNum;
            ret.push(array.slice(index, index + xNum));
        }
        return ret
    }

    goToKeepList(task: Task) {
        // APIにtaskでREST投げて返り値からKeepListを生成してページ遷移
        this.navCtrl.push(KeepListPage, { task: task.ref })
    }

    goToAccount() {
        this.navCtrl.push(AccountPage)
    }

    gotoInputTask() {
        this.navCtrl.push(InputTaskPage)
    }
    gotoTestRegistration() {
        this.navCtrl.push(TestRegistrationPage)
    }
    gotoTestList() {
        this.navCtrl.push(TestListPage)
    }
}
