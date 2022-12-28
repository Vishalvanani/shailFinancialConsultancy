import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { AlertService } from 'src/app/provider/alert.service';

@Component({
  selector: 'app-smart-form',
  templateUrl: './smart-form.page.html',
  styleUrls: ['./smart-form.page.scss'],
})
export class SmartFormPage implements OnInit {
  type: string = '';
  amount: any;
  note: string = '';
  category: any;
  mode: any;
  index: any;
  constructor(
    public modalCtrl: ModalController,
    public alertService: AlertService,
    public navParams: NavParams,
  ) { }

  ngOnInit() {
    this.mode = this.navParams.get('type')
    if (this.mode == 'edit') {
      this.type = this.navParams.get('data').type;
      this.amount = this.navParams.get('data').amount;
      this.category = this.navParams.get('data').category;
      this.note = this.navParams.get('data').note;
      this.index = this.navParams.get('index');
    } else {
      this.type = 'income'
    }
  }

  async closeModel() {
    const close: string = "Modal Removed";
    await this.modalCtrl.dismiss(close);
  }
  async submitModel() {
    if (!this.category) {
      this.alertService.presentToast('Please select category')
      return false;
    } else if (!this.amount) {
      this.alertService.presentToast('Please enter amount')
      return false;
    } else {
      var data = {
        category: this.category,
        type: this.type,
        amount: this.amount,
        note: this.note
      }
      await this.modalCtrl.dismiss({ data: data, mode: this.mode, index: this.index });
      return true;
    }
  }
}
