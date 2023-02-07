import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpService } from 'src/app/provider/http.service';
import { SmartFormPage } from '../smart-form/smart-form.page';
import * as moment from 'moment';

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
  incomeCategoryList: any[] = [];
  expenseCategoryList: any[] = [];
  currentDate: string;

  constructor(
    public modalCtrl: ModalController,
    private httpService: HttpService
  ) { 
    this.currentDate = moment().year()+'-'+this.minTwoDigits(moment().month())
  }

  minTwoDigits(n: any) {
    return (n < 10 ? '0' : '') + n;
  }

  // --- fetch income category
  fetchIncomeCategory() {
    return new Promise((resolve, reject) => {
      this.httpService.get("list_income.php").subscribe(res => {
        console.log('res: ', res);
        this.incomeCategoryList = res.items;
        resolve('');
      }, (err) => {
        this.incomeCategoryList = [];
        reject(err)
      })
    })
  }

  // --- fetch expense category
  fetchExpenseCategory() {
    return new Promise((resolve, reject) => {
      this.httpService.get("list_expense.php").subscribe(res => {
        console.log('res: ', res);
        this.expenseCategoryList = res.items;
        resolve('');
      }, (err) => {
        this.expenseCategoryList = [];
        reject(err)
      })
    })
  }

  async ngOnInit() {
    await this.fetchIncomeCategory();
    await this.fetchExpenseCategory();
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
