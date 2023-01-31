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
  totalIncome: number = 0;
  totalExpense: number = 0;
  incomeArray: any = [];
  expenseArray: any = [];

  constructor(
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.dateTime = new Date().toISOString();
    });
  }

  async presentSmartPopup(type: string, data?: any, index?: number) {
    const modal = await this.modalCtrl.create({
      component: SmartFormPage,
      componentProps: {
        'type': type,
        'data': data,
        'index': index
      }
    });

    modal.onDidDismiss().then((modelData) => {
      if (modelData !== null) {
        if (modelData.data.data.type == 'income') {
          if (modelData.data.mode == 'edit') {
            this.incomeArray[modelData.data.index] = modelData.data.data
          } else {
            this.incomeArray.push(modelData.data.data)
          }
          this.totalIncome = 0;
          for (var i in this.incomeArray) {
            this.totalIncome += parseInt(this.incomeArray[i].amount);
          }
        } else {
          if (modelData.data.mode == 'edit') {
            this.expenseArray[modelData.data.index] = modelData.data.data
          } else {
            this.expenseArray.push(modelData.data.data)
          }
          this.totalExpense = 0;
          for (var i in this.expenseArray) {
            this.totalExpense += parseInt(this.expenseArray[i].amount);
          }
        }
      }
    });
    return await modal.present();
  }


}
