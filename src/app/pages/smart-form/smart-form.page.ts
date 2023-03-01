import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import * as moment from 'moment';
import { AlertService } from 'src/app/provider/alert.service';
import { CommonService } from 'src/app/provider/common.service';
import { HttpService } from 'src/app/provider/http.service';

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
  incomeCategoryList: any[] = [];
  expenseCategoryList: any[] = [];
  mode: any;
  index: any;
  constructor(
    public modalCtrl: ModalController,
    public alertService: AlertService,
    private httpService: HttpService,
    private commonService: CommonService,
    public navParams: NavParams,
  ) { }

  async ngOnInit() {
    await this.alertService.presentLoader("");
    await this.fetchIncomeCategory();
    await this.fetchExpenseCategory();
    await this.alertService.dismissLoader();
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
    let errorMsg = '';

    if(this.alertService.isBlank(this.category)) {
      errorMsg = 'Please select category'
    } else if(this.alertService.isBlank(this.amount)) {
      errorMsg = 'Please enter amount';
    } 

    if(errorMsg) {
      this.alertService.presentAlert(errorMsg);
    } else {
      if (this.type === 'income') {
        let income = {
          client_id: this.commonService.userData.e_id,
          income_id: this.category,
          amount: this.amount,
          date: moment(new Date()).format('YYYY-MM-DD')
        };
        this.alertService.presentLoader('');
        this.httpService.post("add_customer_income.php", income).subscribe(res => {
          this.alertService.dismissLoader();
          this.modalCtrl.dismiss();
        }, async (err) => {
          this.alertService.dismissLoader();
          this.modalCtrl.dismiss();
          this.alertService.presentAlert(err);
        })
      } else {
        let expence = {
          c_client_id: this.commonService.userData.e_id,
          c_income_id: this.category,
          c_amount: this.amount,
          c_date: moment(new Date()).format('YYYY-MM-DD')
        };

        await this.alertService.presentLoader('');
        this.httpService.post("add_customer_expense.php", expence).subscribe( res => {
           this.alertService.dismissLoader();
           this.modalCtrl.dismiss();
        }, async (err) => {
           this.alertService.dismissLoader();
           this.modalCtrl.dismiss();
           this.alertService.presentAlert(err);
        })
      }
    }
  }

  // --- fetch income category
  fetchIncomeCategory() {
    return new Promise((resolve, reject) => {
      this.httpService.get("list_income.php").subscribe(res => {
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
        this.expenseCategoryList = res.items;
        resolve('');
      }, (err) => {
        this.expenseCategoryList = [];
        reject(err)
      })
    })
  }
}
