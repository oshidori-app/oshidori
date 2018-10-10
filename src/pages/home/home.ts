import { InputTaskPage } from './../input-task/input-task';
import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { KeepListPage } from '../keep-list/keep-list';
import { Platform } from 'ionic-angular';
import { Task } from '../../models/task' ;
import { AccountPage } from '../account/account';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  public tasks = [];
  public taskInfoVisible = false;
  public platformWidth = 0;

  constructor(public navCtrl: NavController, public platform: Platform) {
    // デバイスの画面幅を取得
    this.platformWidth = platform.width();

    // パネルのデータを設定
    // 本来はAPIの返り値の取得処理
    this.tasks = this.makeTasks();
  }

  makeTasks(){
    let xNum = 2;
    let tasks = [
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
    ]
    // 表示用に配列を整形
    let ret = [];
    for(let i = 0; i < Math.ceil(tasks.length / xNum); i++){
      var index = i * xNum;
      ret.push(tasks.slice(index, index + xNum));
    }
    return ret
  }

  ionViewDidLoad(){
  }

  taskInfoViewToggle() {
    this.taskInfoVisible = !this.taskInfoVisible;
    if (this.taskInfoVisible){
      [].forEach.call(document.getElementsByClassName('task_info'),function(taskinfo){
        taskinfo.classList.remove('fadeOutDown');
        taskinfo.classList.add('fadeInUp');
      });
    }
  }

  goToKeepList(task){
    // APIにtaskでREST投げて返り値からKeepListを生成してページ遷移
    this.navCtrl.push(KeepListPage)
  }

  goToAccount(){
    this.navCtrl.push(AccountPage)
  }

  gotoInputTask() {
    this.navCtrl.push(InputTaskPage)
  }
}
