import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SmartFormPage } from '../smart-form/smart-form.page';

@Component({
  selector: 'app-income-expense',
  templateUrl: './income-expense.page.html',
  styleUrls: ['./income-expense.page.scss'],
})
export class IncomeExpensePage implements OnInit {
  dateTime: string = '';

  constructor(
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.dateTime = new Date().toISOString();
    });
  }

  async presentSmartPopup(type: string, data?: any) {
    const modal = await this.modalCtrl.create({
      component: SmartFormPage,
      componentProps: {
        'type': type,
        'data': data
      }
    });
    modal.onDidDismiss().then((modelData) => {
      if (modelData !== null) {
        console.log('modelData: ', modelData);
      }
    });
    return await modal.present();
  }


}
