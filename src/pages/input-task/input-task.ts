import { Component, NgModule } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Task } from '../../models/task';
import { DisplayUtilService } from '../../providers/display-util.service';
import { TaskRepository } from './../../repository/task.repository';
import { Logger } from '../../logger';
import { BackdropProvider } from '../../providers/backdrop/backdrop';

@Component({
    selector: 'page-input-task',
    templateUrl: 'input-task.html',
})
export class InputTaskPage {

    public taskVm: {
        title?: string
    } = {};

    constructor(
        private viewCtrl: ViewController,
        private taskRepository: TaskRepository,
        private clientStorage: Storage,
        private backdrop: BackdropProvider,
        private dutil: DisplayUtilService
    ) {
        this.backdrop.show();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad InputTaskPage');
    }

    input() {
        this.clientStorage.get('groupRef')
            .then(val => {
                Logger.debug('get from storage');
                Logger.debug(val);

                let task = new Task({
                    title: this.taskVm.title,
                    parentRef: val
                });
                Logger.debug('groupRef:' + task.parentRef);
                this.taskRepository.add(task)
                    .then(() => {
                        this.dutil.showToast('タスクを登録しました！');
                    })
                    .catch((err) => {
                        Logger.error(err);
                        this.dutil.showToast('タスク登録に失敗しました。時間をおいて再度試してください。');
                    })
                    .then(() => {
                        this.viewCtrl.dismiss();
                        this.backdrop.hide();
                    });
            }).catch(err => {
                Logger.error(err);
            });
    }

    dismiss() {
        this.viewCtrl.dismiss();
        this.backdrop.hide();
    }

}
