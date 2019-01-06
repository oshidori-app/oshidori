import { TaskRepository } from './../../repository/task.repository';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Task } from '../../models/task';

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

  private TaskRepository: TaskRepository;
  public title="";

  constructor(public navCtrl: NavController, public navParams: NavParams, private taskRepository: TaskRepository) {
    this.TaskRepository = taskRepository;
  }

  public event = {
    month: new Date().toISOString(),
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InputTaskPage');
  }

  input() {
    const id = Math.random() * 10000
    this.TaskRepository.add(new Task(id, this.title, null, null, 'unfinished', null));
  }
}
