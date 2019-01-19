import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Task } from '../../models/task';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController) {
    this.selectedTask = navParams.get('selectedTask');
  }

  ionViewDidLoad() {
  }

  input() {
    //todo repository 呼び出して書き込み
    this.toastCtrl.create({ message: '候補を追加しました！', position: 'top' }).present();
    this.navCtrl.pop();
  }
}
