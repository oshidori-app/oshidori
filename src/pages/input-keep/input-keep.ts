import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs';

import { Logger } from '../../logger';
import { Keep } from '../../models/keep';
import { Task } from '../../models/task';
import { DisplayUtilService } from '../../providers/display-util.service';
import { StorageService } from '../../providers/storage.service';
import { KeepRepository } from '../../repository/keep.repository';

import { TaskRepository } from './../../repository/task.repository';

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
  tasks = [];
  selectedTask;
  memo = '';
  imgUrl: Observable<string>;
  private fullPath: string;
  imgLoaded = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private keepRepository: KeepRepository, private taskRepository: TaskRepository, private clientStorage: Storage, private storage: StorageService, private toastCtrl: ToastController) {
    this.selectedTask = navParams.get('selectedTask');
    this.fullPath = navParams.get('imgUrl');
    this.imgUrl = this.storage.getDownloadURL(this.fullPath);
  }

  ionViewDidLoad() {

    this.clientStorage.get('groupRef')
      .then(val => {
        const task = new Task({
          parentRef: val,
        });
        this.taskRepository.list(task).subscribe(result => {
          this.tasks = result;
        });
      })
      .catch(err => {
        Logger.error(err);
      });
  }

  input() {
    Logger.debug('keep登録します');
    Logger.debug(this.selectedTask);
    this.keepRepository.add(new Keep({ imgUrl: this.fullPath, memo: this.memo, parentRef: this.selectedTask }))
      .then(() => {
        this.toastCtrl.create({ message: '候補を追加しました！', position: 'top', duration: 2000 }).present();
        this.navCtrl.pop();
      }).catch(e => {
        this.toastCtrl.create({ message: e, position: 'top', duration: 2000 }).present();
        this.navCtrl.pop();
      });
  }

  onImageLoaded(index) {
    Logger.debug('loaded: ' + index);
    this.imgLoaded = true;
  }

}
