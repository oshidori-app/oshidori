import { TaskRepository } from './../../repository/task.repository';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Task } from '../../models/task';
import { KeepRepository } from '../../repository/keep.repository';
import { Keep } from '../../models/keep';
import { DisplayUtilService } from '../../providers/display-util.service';
import { Storage } from '@ionic/storage';
import { Logger } from '../../logger';

/**
 * Generated class for the InputKeepPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-input-keep',
  templateUrl: 'input-keep.html',
})
export class InputKeepPage {
  public tasks = [];
  public selectedTask;
  public memo = "";
  public imgUrl;

  constructor(public navCtrl: NavController, public navParams: NavParams, private keepRepository: KeepRepository, private taskRepository: TaskRepository, private clientStorage: Storage, private toastCtrl: ToastController) {
    this.selectedTask = navParams.get('selectedTask');
    this.imgUrl = navParams.get('imgUrl');
  }

  ionViewDidLoad() {

    this.clientStorage.get('groupRef')
      .then(val => {
        let task = new Task({
          parentRef: val
        });
        this.taskRepository.list(task).subscribe(result =>{
          this.tasks = result;
        })
      })
      .catch(err =>{
        Logger.error(err);
      })


  }

  input() {
    Logger.debug('keep登録します');
    Logger.debug(this.selectedTask);
    this.keepRepository.add(new Keep({ imgUrl: this.imgUrl, memo: this.memo, parentRef: this.selectedTask }))
      .then(() => {
        this.toastCtrl.create({ message: '候補を追加しました！', position: 'top', duration: 2000 }).present();
        this.navCtrl.pop();
      }).catch((e) => {
        this.toastCtrl.create({ message: e, position: 'top', duration: 2000 }).present();
        this.navCtrl.pop();
      });
  }
}
