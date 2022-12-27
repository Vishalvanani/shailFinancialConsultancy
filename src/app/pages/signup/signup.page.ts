import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/provider/alert.service';
import { CommonService } from 'src/app/provider/common.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  account: any = {};
  signInObj: any = {};
  isSignup: boolean = true;
  constructor(private alertService: AlertService, private commonService: CommonService) { }

  ngOnInit() {
  }


  async checkValidation() {
    let errorMsg = "";

    console.log('this.account: ', this.account);
    if (this.alertService.isBlank(this.account.name)) {
      errorMsg = "Please enter your name";
    } else if (this.alertService.isBlank(this.account.email)) {
      errorMsg = "Please enter your email";
    } else if(!this.commonService.validateEmail(this.account.email)) {
      errorMsg = "Please enter valid email address";
    } else if (this.alertService.isBlank(this.account.mobile)) {
      errorMsg = "Please enter your mobile number";
    } else if (this.alertService.isBlank(this.account.password)) {
      errorMsg = "Please enter password";
    } else if(this.account.password.length < 6) {
      errorMsg = "Password must be at least 6 characters";
    }

    if (errorMsg) {
      this.alertService.presentAlert(errorMsg);
    } else {
      console.log(this.account);
      await this.alertService.presentLoader("");
      // this.onSignup();
      setTimeout(async () => {
        await this.alertService.dismissLoader();
      }, 5000);
    }
  }


  // --- signin
  signIn() {
    this.isSignup = false;
  }


  // --- Do login
  async doLogin() {
    let errorMsg = '';

    console.log('this.signInObj: ', this.signInObj);
    if (this.alertService.isBlank(this.signInObj.email)) {
      errorMsg = "Please enter your email";
    } else if(!this.commonService.validateEmail(this.signInObj.email)) {
      errorMsg = "Please enter valid email address";
    } else if (this.alertService.isBlank(this.signInObj.password)) {
      errorMsg = "Please enter password";
    } else if(this.signInObj.password.length < 6) {
      errorMsg = "Password must be at least 6 characters";
    }

    if (errorMsg) {
      this.alertService.presentAlert(errorMsg);
    } else {
      console.log(this.signInObj);
      await this.alertService.presentLoader("");
      // this.onSignup();
      setTimeout(async () => {
        await this.alertService.dismissLoader();
      }, 5000);
    }

  }
  
  openSignupUI() {
    this.isSignup = true;
  }
}
