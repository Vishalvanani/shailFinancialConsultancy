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
  mode: string = "income";
  index: any;
  data: any;
  isIncome: boolean = false;
  constructor(
    public modalCtrl: ModalController,
    public alertService: AlertService,
    private httpService: HttpService,
    private commonService: CommonService,
    public navParams: NavParams
  ) {}

  async ngOnInit() {
    await this.alertService.presentLoader('');
    await this.fetchIncomeCategory();
    await this.fetchExpenseCategory();
    await this.alertService.dismissLoader();
    this.type = this.navParams.get('type');
    if (this.type == 'edit') {
      this.data = this.navParams.get('data');
      this.isIncome = this.navParams.get('isIncome');
      this.mode = this.isIncome ? 'income' : 'expense';
      this.category = this.isIncome
        ? this.data.income_id
        : this.data.c_expense_id;
      this.amount = this.isIncome ? this.data.amount : this.data.c_amount;
    } else {
      this.type = 'add';

    }
  }

  async closeModel() {
    const close: string = 'Modal Removed';
    await this.modalCtrl.dismiss(close);
  }
  async submitModel() {
    let errorMsg = '';

    if (this.alertService.isBlank(this.category)) {
      errorMsg = 'Please select category';
    } else if (this.alertService.isBlank(this.amount)) {
      errorMsg = 'Please enter amount';
    }

    if (errorMsg) {
      this.alertService.presentAlert(errorMsg);
    } else {
      if (this.mode === 'income') {
        this.alertService.presentLoader('');
        if (this.type == 'edit') {
          let obj = {
            c_i_id: this.data.c_i_id,
            client_id: this.commonService.userData.e_id,
            income_id: this.category,
            amount: this.amount,
            date: moment(new Date()).format('YYYY-MM-DD'),
          };
          this.httpService
            .put(
              `update_customer_income.php?c_i_id=${this.data.c_i_id}`,
              obj
            )
            .subscribe(
              (res) => {
                setTimeout(() => {
                  this.alertService.dismissLoader();
                  this.modalCtrl.dismiss({ type: 'income' });
                }, 2000);
              },
              async (err) => {
                this.alertService.dismissLoader();
                this.modalCtrl.dismiss();
                this.alertService.presentAlert(err);
              }
            );
        } else {
          let income = {
            client_id: this.commonService.userData.e_id,
            income_id: this.category,
            amount: this.amount,
            date: moment(new Date()).format('YYYY-MM-DD'),
          };
          this.httpService.post('add_customer_income.php', income).subscribe(
            (res) => {
              setTimeout(() => {
                this.alertService.dismissLoader();
                this.modalCtrl.dismiss({ type: 'income' });
              }, 2000);
            },
            async (err) => {
              this.alertService.dismissLoader();
              this.modalCtrl.dismiss();
              this.alertService.presentAlert(err);
            }
          );
        }
      } else {
        await this.alertService.presentLoader('');
        if (this.type == 'edit') {
          let obj = {
            c_e_id: this.data.c_e_id,
            c_expense_id: this.category,
            c_client_id: this.commonService.userData.e_id,
            c_amount: this.amount,
            c_date: moment(new Date()).format('YYYY-MM-DD'),
          };
          this.httpService
            .put(`update_customer_expense.php?c_e_id=${this.data.c_e_id}`, obj)
            .subscribe(
              (res) => {
                setTimeout(() => {
                  this.alertService.dismissLoader();
                  this.modalCtrl.dismiss({ type: 'expense' });
                }, 2000);
              },
              async (err) => {
                this.alertService.dismissLoader();
                this.modalCtrl.dismiss();
                this.alertService.presentAlert(err);
              }
            );
        } else {
          let expense = {
            c_client_id: this.commonService.userData.e_id,
            c_expense_id: this.category,
            c_amount: this.amount,
            c_date: moment(new Date()).format('YYYY-MM-DD'),
          };
          this.httpService.post('add_customer_expense.php', expense).subscribe(
            (res) => {
              setTimeout(() => {
                this.alertService.dismissLoader();
                this.modalCtrl.dismiss({ type: 'expense' });
              }, 2000);
            },
            async (err) => {
              this.alertService.dismissLoader();
              this.modalCtrl.dismiss();
              this.alertService.presentAlert(err);
            }
          );
        }
      }
    }
  }

  // --- fetch income category
  fetchIncomeCategory() {
    return new Promise((resolve, reject) => {
      this.httpService.get('list_income.php').subscribe(
        (res) => {
          this.incomeCategoryList = res.items;
          resolve('');
        },
        (err) => {
          this.incomeCategoryList = [];
          reject(err);
        }
      );
    });
  }

  // --- fetch expense category
  fetchExpenseCategory() {
    return new Promise((resolve, reject) => {
      this.httpService.get('list_expense.php').subscribe(
        (res) => {
          this.expenseCategoryList = res.items;
          resolve('');
        },
        (err) => {
          this.expenseCategoryList = [];
          reject(err);
        }
      );
    });
  }
}
