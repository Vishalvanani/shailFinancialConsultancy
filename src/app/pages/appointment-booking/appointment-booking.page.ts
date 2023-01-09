import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/provider/alert.service';
import { CommonService } from 'src/app/provider/common.service';
import { HttpService } from 'src/app/provider/http.service';

@Component({
  selector: 'app-appointment-booking',
  templateUrl: './appointment-booking.page.html',
  styleUrls: ['./appointment-booking.page.scss'],
})
export class AppointmentBookingPage {
  inquiryForm: any = {};
  constructor(
    private alertService: AlertService,
    private commonService: CommonService,
    private httpService: HttpService,
    private router: Router
  ) {}

  ngOnInit() {}

  async checkValidation() {
    let errorMsg = '';
    if (this.alertService.isBlank(this.inquiryForm.name)) {
      errorMsg = 'Please enter your name';
    } else if (this.alertService.isBlank(this.inquiryForm.email)) {
      errorMsg = 'Please enter your email';
    } else if (!this.commonService.validateEmail(this.inquiryForm.email)) {
      errorMsg = 'Please enter valid email address';
    } else if (this.alertService.isBlank(this.inquiryForm.mobile)) {
      errorMsg = 'Please enter your mobile number';
    } else if (this.alertService.isBlank(this.inquiryForm.inquiryFor)) {
      errorMsg = 'Please enter reason for inquiry';
    }

    if (errorMsg) {
      this.alertService.presentAlert(errorMsg);
    } else {
      console.log(this.inquiryForm);

      await this.alertService.presentLoader('');
      this.httpService.post('add_appointment.php', this.inquiryForm).subscribe(async res => {
        await this.alertService.presentToast("Appointment booking successfully");
        await this.alertService.dismissLoader();
        await this.router.navigate(['']);
      }, async (err) => {
        console.log('err: ', err);
        await this.alertService.dismissLoader();
        await this.alertService.presentAlert(err.message);
      })

      setTimeout(async () => {
        await this.alertService.dismissLoader();
      }, 5000);
    }
  }
}
