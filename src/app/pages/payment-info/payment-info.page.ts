import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/provider/http.service';

@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.page.html',
  styleUrls: ['./payment-info.page.scss'],
})
export class PaymentInfoPage implements OnInit {

  paymentInfoList: any[] = [];
  constructor(private httpService: HttpService) { }

  async ngOnInit() {
    await this.getPaymentInfo();
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
