import { Component } from '@angular/core';

import { reorderArray, NavController, NavParams } from 'ionic-angular';



// import { ItemDetailsPage } from '../item-details/item-details';

@Component({
  selector: 'page-ranking',
  templateUrl: 'ranking.html'
})
export class RankingPage {
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  isSortable: boolean;
  sortLabel: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.isSortable = false;
    this.sortLabel = "Sort"

    this.items = [];
    for(let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  changeOrder(event) {
    this.isSortable = !this.isSortable;

    this.sortLabel = this.isSortable ? "Finish" : "Sort"
  }

  reorderItems(indexes) {
    this.items = reorderArray(this.items, indexes);
  }

  // itemTapped(event, item) {
  //   // this.navCtrl.push(ItemDetailsPage, {
  //     // item: item
  //   // });
  // }
}
