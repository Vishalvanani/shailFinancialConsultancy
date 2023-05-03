import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { AlertService } from 'src/app/provider/alert.service';
import { CommonService } from 'src/app/provider/common.service';
import { HttpService } from 'src/app/provider/http.service';
import { UserService } from 'src/app/provider/user.service';

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
    public router: Router,
    private userService: UserService
  ) {}

  async ngOnInit() {
    let userData: any = await Preferences.get({ key: 'userData' });
    if (userData && userData.value) {
      this.commonService.userData = JSON.parse(userData.value);
    } else {
      this.router.navigate(['signup'], { queryParams: { isUserLoggedin: '' } });
    }

    this.isUserLoggedin =
      this.route.snapshot.queryParamMap.get('isUserLoggedin');
    console.log('this.isUserLoggedin: ', this.isUserLoggedin);
    if (!this.isUserLoggedin) {
      this.signIn();
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
      await this.alertService.presentLoader('');
      let obj = {
        e_name: this.account.name,
        e_mob: this.account.mobile,
        user_id: this.account.email,
        password: this.account.password,
      };

      this.httpService.post('add_employee.php', obj).subscribe(
        (res) => {
          console.log('res: ', res);
          this.userService.fetchUserInfo(res.insertid).subscribe(
            async (userInfoRes) => {
              await this.alertService.dismissLoader();
              if (
                userInfoRes &&
                userInfoRes.items &&
                userInfoRes.items.length > 0
              ) {
                this.alertService.presentToast('User Signup Success');
                this.commonService.userData = userInfoRes.items[0];
                Preferences.set({
                  key: 'userData',
                  value: JSON.stringify(userInfoRes.items[0]),
                });
                this.router.navigate(['']);
              }
            },
            (err) => {
              this.alertService.dismissLoader();
              this.alertService.presentAlert(err.message);
            }
          );
        },
        (err) => {
          this.alertService.dismissLoader();
          this.alertService.presentAlert(err.message);
        }
      );
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
        let formData: FormData = new FormData();
        formData.append('user_id', this.signInObj.email);
        formData.append('password', this.signInObj.password);
        this.httpService.post(`emp_login.php`, formData).subscribe(
          async (data) => {
            console.log('data: ', data);

            // fetch user info and save into local storage
            this.userService.fetchUserInfo(data.userid).subscribe(
              async (userInfoRes) => {
                await this.alertService.dismissLoader();
                if (
                  userInfoRes &&
                  userInfoRes.items &&
                  userInfoRes.items.length > 0
                ) {
                  this.commonService.userData = userInfoRes.items[0];
                  Preferences.set({
                    key: 'userData',
                    value: JSON.stringify(userInfoRes.items[0]),
                  });
                  this.router.navigate(['']);
                } else {
                  this.alertService.presentAlert('User not found!');
                }
              },
              async (err) => {
                console.log('err: ', err);
                this.alertService.presentAlert(err.error.message);
                await this.alertService.dismissLoader();
              }
            );
          },
          async (err) => {
            console.log('err: ', err);
            this.alertService.presentAlert(err.error.message);
            await this.alertService.dismissLoader();
          }
        );
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
