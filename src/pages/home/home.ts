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

export class TaskListVm {
    title?: string;
    done?: boolean;
    keepId?:   string;
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

    constructor(
        public navCtrl: NavController,
        public platform: Platform,
        private taskRepo: TaskRepository,
        private dutil: DisplayUtilService
    ) {
        // デバイスの画面幅を取得
        this.platformWidth = platform.width();
    }

    ionViewDidEnter() {
        Logger.debug("ionViewWillEnter: HomePage");
        this.dutil.showLoader("データを読み込んでいます...");
        this.getTasks();
    }

    private getTasks() {
        this.taskRepo.list(new Task()).subscribe(taskList => {
            Logger.debug(taskList);
            this.taskListVms = taskList;
            this.formatedTaskList = this.formatedArrayForView(2, this.taskListVms)
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
