import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { ImageAttribute } from 'ionic-image-loader';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';

import { Logger } from '../../logger';
import { Task } from '../../models/task';
import { DisplayUtilService } from '../../providers/display-util.service';
import { AccountPage } from '../account/account';
import { KeepListPage } from '../keep-list/keep-list';
import { TestListPage } from '../test-list/test-list';
import { TestRegistrationPage } from '../test-registration/test-registration';

import { StorageService } from './../../providers/storage.service';
import { TaskRepository } from './../../repository/task.repository';
import { InputTaskPage } from './../input-task/input-task';

export class TaskListVm {
    title?: string;
    done?: boolean;
    imgUrl?: string;
    DownloadUrl?: Observable<string>;
}
@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
})

export class HomePage {

    taskListVms: TaskListVm[];
    formatedTaskList: any[];
    taskInfoVisible = false;
    platformWidth = 0;
    imageAttributes: ImageAttribute[] = [];
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
            value: 'task-img',
        });
    }

    ionViewDidEnter() {
        Logger.debug('ionViewWillEnter: HomePage');
        this.dutil.showLoader('データを読み込んでいます...');
        this.getTasks();
    }

    ionViewDidLeave() {
        if (this.listSubscription) { this.listSubscription.unsubscribe(); }
    }

    private getTasks() {
        this.clientStorage.get('groupRef')
            .then(val => {
                Logger.debug('myGroupRef:' + val);
                const task = new Task({
                    parentRef: val,
                });
                this.listSubscription = this.taskRepo.list(task).subscribe(taskList => {
                    Logger.debug(taskList);
                    this.taskListVms = taskList;
                    taskList.forEach((task, i) => {
                        const DownloadUrl = this.strage.getDownloadURL(task.imgUrl);
                        this.taskListVms[i].DownloadUrl = DownloadUrl;
                    });
                    return this.formatedTaskList = this.formatedArrayForView(2, this.taskListVms);
                });
            })
            .catch(err => {
                Logger.error(err);
            })
            .then(() => this.dutil.dismissLoader());
    }

    formatedArrayForView(xNum: number, array: any[]) {
        const ret = [];
        for (let i = 0; i < Math.ceil(array.length / xNum); i++) {
            const index = i * xNum;
            ret.push(array.slice(index, index + xNum));
        }
        return ret;
    }

    goToKeepList(task: Task) {
        // APIにtaskでREST投げて返り値からKeepListを生成してページ遷移
        this.navCtrl.push(KeepListPage, { task: task.ref });
    }

    goToAccount() {
        this.navCtrl.push(AccountPage);
    }

    gotoInputTask() {
        this.navCtrl.push(InputTaskPage);
    }
    gotoTestRegistration() {
        this.navCtrl.push(TestRegistrationPage);
    }
    gotoTestList() {
        this.navCtrl.push(TestListPage);
    }
}
