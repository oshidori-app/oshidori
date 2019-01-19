import { TaskRepository } from './../../repository/task.repository';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Task } from '../../models/task';

@IonicPage()
@Component({
    selector: 'page-input-task',
    templateUrl: 'input-task.html',
})
export class InputTaskPage {

    public title = "";

    constructor(public navCtrl: NavController, public navParams: NavParams, private taskRepository: TaskRepository, private toastCtrl: ToastController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad InputTaskPage');
    }

    input() {
        this.taskRepository.add(new Task({title: this.title, done: false, keepId: null})
        ).then(() => {
                this.toastCtrl.create({ message: 'タスクを登録しました！', position: 'top', duration: 2000 }).present();
                this.navCtrl.pop();
            }).catch(() => {
                this.toastCtrl.create({ message: 'タスク登録に失敗しました。時間をおいて再度試してください。', position: 'top', duration: 2000 }).present();
            });
    }
}
