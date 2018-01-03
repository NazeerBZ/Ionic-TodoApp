import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-update-item',
  templateUrl: 'update-item.html',
})
export class UpdateItemPage {

  title: string;
  description: string;

  constructor(public navCtrl: NavController, public view: ViewController, public navParams: NavParams) {

  this.title = this.navParams.get('item').title;
  this.description = this.navParams.get('item').description;
  }

  updateItem() {
    let updatedItem = {
      title: this.title,
      description: this.description
    };

    this.view.dismiss(updatedItem);
  }

  close() {
    this.view.dismiss();
  }

}
