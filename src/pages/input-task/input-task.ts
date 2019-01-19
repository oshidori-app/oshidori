import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Task } from '../../models/task';
import { TaskRepository } from './../../repository/task.repository';
import { DisplayUtilService } from '../../providers/display-util.service';

@IonicPage()
@Component({
    selector: 'page-input-task',
    templateUrl: 'input-task.html',
})
export class InputTaskPage {

    public taskVm: {
        title?: string
    } = {};

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private viewCtrl: ViewController,
        private taskRepository: TaskRepository,
        private dutil: DisplayUtilService
    ) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad InputTaskPage');
    }

    input() {
        let task = new Task({
            title: this.taskVm.title
        });
        this.taskRepository.add(task)
            .then(() => {
                this.dutil.showToast('タスクを登録しました！');
            })
            .catch(() => {
                this.dutil.showToast('タスク登録に失敗しました。時間をおいて再度試してください。');
            })
            .then(() => {
                this.viewCtrl.dismiss();
            });

    }
}
