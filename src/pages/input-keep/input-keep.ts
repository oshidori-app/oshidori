import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Task } from '../../models/task';
import { KeepRepository } from '../../repository/keep.repository';
import { Keep } from '../../models/keep';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private keepRepository: KeepRepository, private toastCtrl: ToastController) {
    this.selectedTask = navParams.get('selectedTask');
  }

  ionViewDidLoad() {
    this.tasks = [
      new Task({ title: "ほげほげ", done: false, keepId: "123" })
    ]
  }

  input() {
    this.keepRepository.add(new Keep({ imageUrl: "", memo: this.memo, parentRef: this.selectedTask }))
    .then(() => {
      this.toastCtrl.create({ message: '候補を追加しました！', position: 'top', duration: 2000 }).present();
      this.navCtrl.pop();
    }).catch((e) => {
      this.toastCtrl.create({ message: e, position: 'top', duration: 2000 }).present();
      this.navCtrl.pop();
    });
  }
}
