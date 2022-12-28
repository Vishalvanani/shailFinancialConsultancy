import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/provider/alert.service';
import { HttpService } from 'src/app/provider/http.service';

@Component({
  selector: 'app-smart-form',
  templateUrl: './smart-form.page.html',
  styleUrls: ['./smart-form.page.scss'],
})
export class SmartFormPage implements OnInit {
note: string = '';
type: any;
amount: any;
category: any;
incomeCategoryList: any[] = [];
expenseCategoryList: any[] = [];
  constructor(
    public modalCtrl: ModalController,
    public alertService: AlertService,
    private httpService: HttpService
    ) { }

  async ngOnInit() {
    await this.fetchIncomeCategory();
    await this.fetchExpenseCategory();
  }

  async closeModel() {
    const close: string = "Modal Removed";
    await this.modalCtrl.dismiss(close);
  }
   async submitModel() {
    if(!this.category){
      this.alertService.presentToast('Please select category')
      return false;
    } else if(!this.amount){
      this.alertService.presentToast('Please enter amount')
      return false;
    }else {
      let data = {
        category: this.category, 
        type: this.type, 
        amount: this.amount, 
        note: this.note
      }
      console.log(data);
      await this.modalCtrl.dismiss(data);
      return true;
    }
  }

  // --- fetch income category
  fetchIncomeCategory() {
    return new Promise((resolve, reject) => {
      this.httpService.get("list_income.php").subscribe(res => {
        console.log('res: ', res);
        this.incomeCategoryList = res;
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
        this.expenseCategoryList = res;
        resolve('');
      }, (err) => {
        this.expenseCategoryList = [];
        reject(err)
      })
    })
  }
}
