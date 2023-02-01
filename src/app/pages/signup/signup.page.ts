import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { AlertService } from 'src/app/provider/alert.service';
import { CommonService } from 'src/app/provider/common.service';
import { HttpService } from 'src/app/provider/http.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  account: any = {};
  signInObj: any = {};
  isSignup: boolean = true;
  isUserLoggedin: any;
  constructor(
    private alertService: AlertService,
    private route: ActivatedRoute,
    private commonService: CommonService,
    private httpService: HttpService,
    public router: Router
  ) {}

  async ngOnInit() {

    let userData: any = await Preferences.get({key: "userData"})
    if(userData && userData.value) {
      this.commonService.userData = JSON.parse(userData.value);
    } else {
      this.router.navigate(['signup'], { queryParams: { isUserLoggedin: "" } })
    }

    this.isUserLoggedin = this.route.snapshot.queryParamMap.get('isUserLoggedin');
    console.log('this.isUserLoggedin: ', this.isUserLoggedin);
    if(!this.isUserLoggedin) {
      console.log("30");
      this.signIn()
    } 
  }

  async checkValidation() {
    let errorMsg = '';

    if (this.alertService.isBlank(this.account.name)) {
      errorMsg = 'Please enter your name';
    } else if (this.alertService.isBlank(this.account.email)) {
      errorMsg = 'Please enter your email';
    } else if (!this.commonService.validateEmail(this.account.email)) {
      errorMsg = 'Please enter valid email address';
    } else if (this.alertService.isBlank(this.account.mobile)) {
      errorMsg = 'Please enter your mobile number';
    } else if (this.alertService.isBlank(this.account.password)) {
      errorMsg = 'Please enter password';
    } else if (this.account.password.length < 6) {
      errorMsg = 'Password must be at least 6 characters';
    }

    if (errorMsg) {
      this.alertService.presentAlert(errorMsg);
    } else {
      // await this.alertService.presentLoader('');
      // setTimeout(async () => {
      //   await this.alertService.dismissLoader();
      // }, 5000);
      this.alertService.presentToast("User Signup Success")
      this.router.navigate(['']);
      this.commonService.userData = this.account;
      Preferences.set({ key: "userData", value: JSON.stringify(this.account)});
    }
  }

  // --- sign in
  signIn() {
    this.isSignup = false;
  }

  // --- Do login
  async doLogin() {
    let errorMsg = '';

    if (this.alertService.isBlank(this.signInObj.email)) {
      errorMsg = 'Please enter your email';
    } else if (!this.commonService.validateEmail(this.signInObj.email)) {
      errorMsg = 'Please enter valid email address';
    } else if (this.alertService.isBlank(this.signInObj.password)) {
      errorMsg = 'Please enter password';
    } else if (this.signInObj.password.length < 6) {
      errorMsg = 'Password must be at least 6 characters';
    }

    if (errorMsg) {
      this.alertService.presentAlert(errorMsg);
    } else {
      await this.alertService.presentLoader('');

      try {
        // this.httpService
        //   .get(
        //     `emp_login.php?user_id=${this.signInObj.email}&password=${this.signInObj.password}`
        //   )
        //   .subscribe(async (data) => {
        //     await this.alertService.dismissLoader();
        //     if(data.status) {
        //     } else {
        //       this.alertService.presentAlert(data.message);
        //     }
        //   });
        this.alertService.presentToast("User Login Successfully");
        let obj = {
          name: "Vishal Vanani",
          email: "vishal@gmail.com",
          mobile: "918530244224",
          password: "testing"
        }
        this.commonService.userData = obj;
        Preferences.set({ key: "userData", value: JSON.stringify(obj)});
        this.router.navigate(['']);
      } catch (err: any) {
        this.alertService.presentAlert(err.message);
        await this.alertService.dismissLoader();
      }
    }
  }

  openSignupUI() {
    this.isSignup = true;
  }
}
