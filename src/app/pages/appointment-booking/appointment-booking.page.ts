import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as dayjs from 'dayjs';
import { AlertService } from 'src/app/provider/alert.service';
import { CommonService } from 'src/app/provider/common.service';
import { HttpService } from 'src/app/provider/http.service';

@Component({
  selector: 'app-appointment-booking',
  templateUrl: './appointment-booking.page.html',
  styleUrls: ['./appointment-booking.page.scss'],
})
export class AppointmentBookingPage {
  appointment: any = {};
  constructor(
    private alertService: AlertService,
    private commonService: CommonService,
    private httpService: HttpService,
    private router: Router
  ) {}

  ngOnInit() {
    if(this.commonService.userData) {
      this.appointment.name = this.commonService.userData.e_name;
      this.appointment.mobile = this.commonService.userData.e_mob;
      this.appointment.email = this.commonService.userData.user_id
    }
  }

  async checkValidation() {
    let errorMsg = '';
    if (this.alertService.isBlank(this.appointment.name)) {
      errorMsg = 'Please enter your name';
    } else if (this.alertService.isBlank(this.appointment.email)) {
      errorMsg = 'Please enter your email';
    } else if (!this.commonService.validateEmail(this.appointment.email)) {
      errorMsg = 'Please enter valid email address';
    } else if (this.alertService.isBlank(this.appointment.mobile)) {
      errorMsg = 'Please enter your mobile number';
    } else if (this.alertService.isBlank(this.appointment.appointmentFor)) {
      errorMsg = 'Please enter reason for inquiry';
    }

    if (errorMsg) {
      this.alertService.presentAlert(errorMsg);
    } else {
      console.log(this.appointment);

      let data = {
        name: this.appointment.name,
        phone_number: this.appointment.mobile,
        email_address: this.appointment.email,
        message: this.appointment.appointmentFor,
        inquiry_4: this.appointment.appointmentFor,
        appointment_date: dayjs().format("YYYY-MM-DD")
      }
      
      console.log('data: ', data);

      await this.alertService.presentLoader('');
      this.httpService.post('add_appointment.php', data).subscribe(async res => {
        await this.alertService.presentToast("Appointment booking successfully");
        await this.alertService.dismissLoader();
        await this.router.navigate(['']);
      }, async (err) => {
        console.log('err: ', err);
        await this.alertService.dismissLoader();
        await this.alertService.presentAlert(err.message);
      })
    }
  }
}
