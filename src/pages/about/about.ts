import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { Config } from 'ionic-angular';
import { ItemsAPI } from '../../api/items.service';

declare var AWS: any;

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  users: any;
  apigClient;
  constructor(public navCtrl: NavController, public config: Config, private itemsAPI: ItemsAPI) {
  }

  getUser() {

    var req = {
      params: {
        userId: '1234',
      },
      additionalParams: {
        headers: {
        },
        queryParams: {
        }
      },
      body: {
      }
    }

    this.itemsAPI.getAll(req)
      .then((result) => {
        this.users = result;
      }).catch((result) => {
        console.log(result);
      });
  }
}
