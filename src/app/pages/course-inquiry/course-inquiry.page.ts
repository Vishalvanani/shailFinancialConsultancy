import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/provider/alert.service';
import { HttpService } from 'src/app/provider/http.service';
import * as dayjs from 'dayjs'

@Component({
  selector: 'app-course-inquiry',
  templateUrl: './course-inquiry.page.html',
  styleUrls: ['./course-inquiry.page.scss'],
})
export class CourseInquiryPage implements OnInit {
  inquiryForm: any = {};
  @Input() courseId: any;
  constructor(
    private modalCtrl: ModalController,
    private alertService: AlertService,
    private httpService: HttpService,
  ) {}

  ngOnInit() {}

  async closeModel() {
    const close: string = 'Modal Removed';
    await this.modalCtrl.dismiss(close);
  }

  async checkValidation() {
    let errorMsg;

    if (this.alertService.isBlank(this.inquiryForm.name)) {
      errorMsg = 'Please Enter Your Name';
    } else if (this.alertService.isBlank(this.inquiryForm.mobile)) {
      errorMsg = 'Please Enter Your Mobile Number';
    } else if (this.alertService.isBlank(this.inquiryForm.inquiryFor)) {
      errorMsg = 'Please Enter Your Inquiry';
    }

    if (errorMsg) {
      this.alertService.presentToast(errorMsg);
      return;
    }

    let data = {
      name: this.inquiryForm.name,
      mobile: this.inquiryForm.mobile,
      inquiry: this.inquiryForm.inquiryFor,
      course_id: this.courseId,
      inq_date: dayjs().format("YYYY-MM-DD")
    };
    // await this.alertService.presentLoader('');
    // this.httpService.post("course_add_inquiry.php", data).subscribe(async res => {
      await this.alertService.presentToast("Successfully Added Inquiry");
      // await this.alertService.dismissLoader();
      await this.modalCtrl.dismiss(data);
      return true;
    // }, async (err) => {
    //   await this.alertService.dismissLoader();
    //   // await this.modalCtrl.dismiss(data);
    //   await this.alertService.presentAlert(err);
    //   return true;
    // })
  }
}
