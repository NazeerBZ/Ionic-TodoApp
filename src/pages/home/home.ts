import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { AddItemPage } from '../add-item/add-item';
import { ItemDetailPage } from '../item-detail/item-detail';
import { UpdateItemPage } from '../update-item/update-item';
import { Data } from '../../providers/data/data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public items = [];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public dataService: Data) {

    this.dataService.getData()
      .then((todos) => {

        if (todos) {
          this.items = todos;
        }

      });
  }

  ionViewDidLoad() {

  }

  addItem() {

    let addModal = this.modalCtrl.create(AddItemPage);

    addModal.onDidDismiss((item) => {

      if (item) {
        this.saveItem(item);
      }
    });

    addModal.present();
  }

  saveItem(item) {
    this.items.push(item);
    this.dataService.save(this.items);
  }

  viewItem(item) {

    this.navCtrl.push(ItemDetailPage, {
      item: item
    })
  }

  updateItem(i) {

    let updateModel = this.modalCtrl.create(UpdateItemPage, {
      item: this.items[i]
    });

    updateModel.onDidDismiss((updatedItem) => {

      if (updatedItem) {
        this.items.splice(i, 1, updatedItem);
        this.dataService.save(this.items);
      }
    });

    updateModel.present();
  }

  delItem(i) {
    this.items.splice(i, 1);
    this.dataService.save(this.items);
  }

}
