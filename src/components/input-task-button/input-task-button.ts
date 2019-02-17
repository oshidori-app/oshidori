import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';

import { Logger } from '../../logger';
import { InputTaskPage } from '../../pages/input-task/input-task';

@Component({
  selector: 'input-task-button',
  templateUrl: 'input-task-button.html',
})
export class InputTaskButtonComponent {

  constructor(private navCtrl: NavController, private modalCtrl: ModalController) {}

  goInputTask() {
    const modal = this.modalCtrl.create(InputTaskPage);
    modal.present();
  }

  ionViewDidLoad() {
    Logger.debug('inpu-task-button loaded.');
  }
}
