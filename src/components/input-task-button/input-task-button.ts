import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InputTaskPage } from '../../pages/input-task/input-task';
import { Logger } from '../../providers/logger.service';

@Component({
  selector: 'input-task-button',
  templateUrl: 'input-task-button.html'
})
export class InputTaskButtonComponent {

  constructor(private navCtrl: NavController){}

  goInputTask() {
    this.navCtrl.push(InputTaskPage);
  };

  ionViewDidLoad(){
   Logger.debug("inpu-task-button loaded.")
  }
}
