import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { InputTaskPage } from '../../pages/input-task/input-task';
import { Logger } from '../../logger';

@Component({
  selector: 'input-task-button',
  templateUrl: 'input-task-button.html'
})
export class InputTaskButtonComponent {

  constructor(private navCtrl: NavController, private modalCtrl: ModalController){}

  goInputTask() {
    let modal = this.modalCtrl.create(InputTaskPage);
    modal.present();
  };

  ionViewDidLoad(){
    Logger.debug("inpu-task-button loaded.")
  }
}
