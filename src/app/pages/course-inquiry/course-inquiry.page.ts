import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/provider/alert.service';

@Component({
  selector: 'app-course-inquiry',
  templateUrl: './course-inquiry.page.html',
  styleUrls: ['./course-inquiry.page.scss'],
})
export class CourseInquiryPage implements OnInit {

  inquiryForm: any = {};
  constructor(private modalCtrl: ModalController, private alertService: AlertService) { }

  ngOnInit() {
  }

  async closeModel() {
    const close: string = "Modal Removed";
    await this.modalCtrl.dismiss(close);
  }


  async checkValidation() {
    let errorMsg;

    if(this.alertService.isBlank(this.inquiryForm.name)){
      errorMsg = 'Please Enter Your Name';
    } else if(this.alertService.isBlank(this.inquiryForm.mobile)){
      errorMsg = 'Please Enter Your Mobile Number';
    } else if(this.alertService.isBlank(this.inquiryForm.inquiryFor)) {
      errorMsg = 'Please Enter Your Inquiry';
    }

    if(errorMsg) {
      this.alertService.presentToast(errorMsg);
      return;
    }
    

    let data = {
      name: this.inquiryForm.name, 
      mobile: this.inquiryForm.mobile, 
      inquriy: this.inquiryForm.inquiryFor 
    }
    console.log(data);
    await this.modalCtrl.dismiss(data);
    return true;
  }

}
