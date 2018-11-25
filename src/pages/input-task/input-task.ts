import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the InputTaskPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-input-task',
  templateUrl: 'input-task.html',
})
export class InputTaskPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InputTaskPage');
  }
  gotoHome() {
    this.navCtrl.push(HomePage)
  }
  tasktitle: string;

  addTask(){
    localStorage.setItem('tasktitle', JSON.stringify(this.tasktitle))
    this.tasktitle = "";
  }
  ionViewWillEnter(){
   if(localStorage.getItem('tasktitle')){
     this.tasktitle = JSON.parse(localStorage.getItem('tasktitle'));
   }
  }
}
