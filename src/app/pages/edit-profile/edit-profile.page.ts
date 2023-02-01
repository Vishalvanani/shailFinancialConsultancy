import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { AlertService } from 'src/app/provider/alert.service';
import { CommonService } from 'src/app/provider/common.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  account: any = {};

  constructor(
    private commonService: CommonService,
    private alertService: AlertService,
    private router: Router
  ) { }

  async ngOnInit() {

    let userData: any = await Preferences.get({key: "userData"})
    console.log('userData: ', userData);
    if(userData && userData.value) this.commonService.userData = JSON.parse(userData.value);
    console.log('this.commonService.userData: ', this.commonService.userData);
    this.account = this.commonService.userData;
  }

  updateProfile() {
    let errorMsg = '';

    if (this.alertService.isBlank(this.account.name)) {
      errorMsg = 'Please enter your name';
    } else if (this.alertService.isBlank(this.account.email)) {
      errorMsg = 'Please enter your email';
    } else if (!this.commonService.validateEmail(this.account.email)) {
      errorMsg = 'Please enter valid email address';
    } else if (this.alertService.isBlank(this.account.mobile)) {
      errorMsg = 'Please enter your mobile number';
    }

    if (errorMsg) {
      this.alertService.presentAlert(errorMsg);
    } else {
      this.alertService.presentToast("User Data updated successfully")
      this.account.password = this.commonService.userData.password;
      this.commonService.userData = this.account;
      Preferences.set({ key: "userData", value: JSON.stringify(this.account)});
      this.router.navigate(['']);
    }
  }

}
