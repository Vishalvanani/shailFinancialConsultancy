import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpService } from 'src/app/provider/http.service';
import { SmartFormPage } from '../smart-form/smart-form.page';
import * as moment from 'moment';
import { CommonService } from 'src/app/provider/common.service';
import { Preferences } from '@capacitor/preferences';
import { AlertService } from 'src/app/provider/alert.service';

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
  userIncomeList: any[] = [];
  userExpenseList: any[] = [];
  currentDate: string;

  constructor(
    public modalCtrl: ModalController,
    private httpService: HttpService,
    private commonService: CommonService,
    private alertService: AlertService
  ) { 
    this.currentDate = moment().year()+'-'+this.minTwoDigits((moment().month() + 1))
  }

  minTwoDigits(n: any) {
    return (n < 10 ? '0' : '') + n;
  }

  // --- fetch income category
  fetchIncomeCategory() {
    return new Promise((resolve, reject) => {
      this.httpService.get("list_income.php").subscribe(res => {
        this.incomeCategoryList = res.items;
        console.log('this.incomeCategoryList: ', this.incomeCategoryList);
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
        this.expenseCategoryList = res.items;
        console.log('this.expenseCategoryList: ', this.expenseCategoryList);
        resolve('');
      }, (err) => {
        this.expenseCategoryList = [];
        reject(err)
      })
    })
  }

  fetchCurrentUserIncomeList() {
    return new Promise((resolve, reject) => {
      this.httpService.get(`list_customer_incom_expense.php?client_id=${this.commonService.userData.e_id}`).subscribe(res => {
        this.userIncomeList = res.items;
        console.log('this.userIncomeList: ', this.userIncomeList);
        resolve('');
      }, (err) => {
        this.userIncomeList = [];
        reject(err)
      })
    })
  }

  fetchCurrentUserExpenseList() {
    return new Promise((resolve, reject) => {
      this.httpService.get(`list_customer_expense.php?c_client_id=${this.commonService.userData.e_id}`).subscribe(res => {
        this.userExpenseList = res.items;
        console.log('this.userExpenseList: ', this.userExpenseList);
        resolve('');
      }, (err) => {
        this.userExpenseList = [];
        reject(err)
      })
    })
  }

  userData: any;
  async ngOnInit() {
    this.userData = await Preferences.get({key: "userData"})
    let promises = [];
    promises.push(this.fetchIncomeCategory());
    promises.push(this.fetchExpenseCategory());
    promises.push(this.fetchIncomeExpenseList())

    await Promise.all(promises)
    setTimeout(() => {
      this.dateTime = new Date().toISOString();
    });
  }

  async fetchIncomeExpenseList() {
    let promises = [];
    await this.alertService.presentLoader("");
    promises.push(this.fetchCurrentUserIncomeList())
    promises.push(this.fetchCurrentUserExpenseList())
    await this.alertService.dismissLoader();
    await Promise.all(promises)
    setTimeout(() => {
      this.dateTime = new Date().toISOString();
    });
    this.changeMonth();
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

    modal.onDidDismiss().then(async (modelData) => {
      console.log('modelData: ', modelData);
      if (modelData !== null) {
        if (modelData.data && modelData.data) {
          if(modelData.data.type) {
            this.currentDate = moment().year()+'-'+this.minTwoDigits((moment().month() + 1))
            if(modelData.data.type == 'income') {
              await this.fetchCurrentUserIncomeList()
            } else {
              await this.fetchCurrentUserExpenseList();
            }
            this.changeMonth();
          }
        }
      }
    });
    return await modal.present();
  }


  selectedMonthIncomeList: any[] = [];
  selectedMonthExpenseList: any[] = []; 
  changeMonth() {
    let monthStartDate = Number(moment(this.currentDate, "YYYY-MM").startOf('month').format("x"));
    let monthEndDate = Number(moment(this.currentDate, "YYYY-MM").endOf("month").format("x"));

    // Selected Month Income List
    this.selectedMonthIncomeList = this.userIncomeList.filter(ele => {
      let itemDate = Number(moment(ele.date, "YYYY-MM-DD").format("x"))
      return ((itemDate >= monthStartDate) && (itemDate <= monthEndDate))
    })

    this.totalIncome = 0;
    for (var i in this.selectedMonthIncomeList) {
      this.totalIncome += parseInt(this.selectedMonthIncomeList[i].amount);
    }

    // Selected Month Expense List
    this.selectedMonthExpenseList = this.userExpenseList.filter(ele => {
      let itemDate = Number(moment(ele.c_date, "YYYY-MM-DD").format("x"))
      return ((itemDate >= monthStartDate) && (itemDate <= monthEndDate))
    })
    console.log('this.selectedMonthExpenseList: ', this.selectedMonthExpenseList);
    this.totalExpense = 0;
    for (var i in this.selectedMonthExpenseList) {
      this.totalExpense += parseInt(this.selectedMonthExpenseList[i].c_amount);
    }
  }
}
