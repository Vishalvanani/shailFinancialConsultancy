import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/provider/alert.service';
import { HttpService } from 'src/app/provider/http.service';

@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.page.html',
  styleUrls: ['./payment-info.page.scss'],
})
export class PaymentInfoPage implements OnInit {

  paymentInfoList: any[] = [];
  constructor(private httpService: HttpService, private alertService: AlertService) { }

  async ngOnInit() {
    await this.alertService.presentLoader('');
    await this.getPaymentInfo();
    await this.alertService.dismissLoader();
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
