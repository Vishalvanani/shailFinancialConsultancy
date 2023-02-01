import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/provider/alert.service';
import { HttpService } from 'src/app/provider/http.service';

@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.page.html',
  styleUrls: ['./payment-info.page.scss'],
})
export class PaymentInfoPage implements OnInit {

  paymentInfoList: any[] = [
    {
      client_name: "Vishal Vanani",
      pay_type: "Cash",
      pay_amount: 2000,
      pay_date: "01 28 2023"
    },
    {
      client_name: "Vishal Patel",
      pay_type: "Online",
      pay_amount: 599,
      pay_date: "01 31 2023"
    },
    {
      client_name: "Shiv Patel",
      pay_type: "Cash",
      pay_amount: 2500,
      pay_date: "02 01 2023"
    },
  ];
  constructor(private httpService: HttpService, private alertService: AlertService) { }

  async ngOnInit() {
    // await this.alertService.presentLoader('');
    // await this.getPaymentInfo();
    // await this.alertService.dismissLoader();
  }

  getPaymentInfo() {
    return new Promise((resolve, reject) => {
      this.httpService.get("list_course_payment.php").subscribe(res => {
        this.paymentInfoList = res;
        resolve('');
      }, (err) => {
        this.paymentInfoList = [];
        reject(err)
      })
    })
  }

}
