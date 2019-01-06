import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.selectedTask = navParams.get('selectedTask');
  }

  ionViewDidLoad() {
    this.tasks = [
      new Task(1,"dress",  "yyyy/MM/dd","assets/img/dress01.jpg",  "finished","shinpu"),
      new Task(2,"present","yyyy/MM/dd","assets/img/present01.jpg","finished","shinro"),
      new Task(3,"travel", "yyyy/MM/dd","assets/img/travel01.jpg", "unfinished","shinro"),
      new Task(4,"food",   "yyyy/MM/dd",null,                      "unfinished","shinro"),
      new Task(5,"ring",   "yyyy/MM/dd","assets/img/ring01.jpg",   "finished","shinpu"),
      new Task(6,"place",  "yyyy/MM/dd","assets/img/place01.jpg",  "unfinished","shinpu"),
      new Task(7,"tuxede", "yyyy/MM/dd","assets/img/tuxede01.jpg", "finished","shinro"),
      new Task(8,"secret", "yyyy/MM/dd",null,                      "finished","shinpu"),
      new Task(9,"dress",  "yyyy/MM/dd","assets/img/dress01.jpg",  "finished","shinpu"),
      new Task(10,"present","yyyy/MM/dd","assets/img/present01.jpg","unfinished","shinro"),
      new Task(11,"travel", "yyyy/MM/dd","assets/img/travel01.jpg", "unfinished","shinro"),
      new Task(12,"secret", "yyyy/MM/dd",null,                      "unfinished","shinro"),
      new Task(13,"ring",   "yyyy/MM/dd","assets/img/ring01.jpg",   "unfinished","shinpu"),
      new Task(14,"place",  "yyyy/MM/dd","assets/img/place01.jpg",  "unfinished","shinpu"),
      new Task(15,"tuxede", "yyyy/MM/dd","assets/img/tuxede01.jpg", "unfinished","shinro"),
      new Task(16,"food",   "yyyy/MM/dd",null,                      "unfinished","shinro"),
    ];
  }
}
