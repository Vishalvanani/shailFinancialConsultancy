import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-smart-form',
  templateUrl: './smart-form.page.html',
  styleUrls: ['./smart-form.page.scss'],
})
export class SmartFormPage implements OnInit {

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async closeModel() {
    const close: string = "Modal Removed";
    await this.modalCtrl.dismiss(close);
  }
}
