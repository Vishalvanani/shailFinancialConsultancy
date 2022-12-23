import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { AlertService } from './provider/alert.service';
import { Location } from "@angular/common";
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'About Us', url: '/folder/aboutUs', icon: 'mail' },
    { title: 'Download', url: '/folder/download', icon: 'download-outline' },
    { title: 'Profile', url: '/folder/profile', icon: 'person-circle-outline' },
    { title: 'Payment Info', url: '/folder/payment-info', icon: 'information-circle-outline' },
  ];
  constructor(
    private platform: Platform,
    private _location: Location,
    public alertController: AlertController,
    public router: Router,
    public alertService: AlertService
  ) {
    this.platform.backButton.subscribeWithPriority(10, async (res) => {
      console.log('window.location.pathname: ', window.location.pathname);
      if (
        this._location.isCurrentPathEqualTo('/folder/home') ||
        this._location.isCurrentPathEqualTo('')
      ) {
        // Show Exit Alert!
        this.showExitConfirm();
      } else {
          this.goToBack();
      }
    });
  }

  goToBack() {
    // Navigate to back page
    this._location.back();
  }

  closeAppAlert: any;
  async showExitConfirm() {
    if(!this.closeAppAlert) {
      this.closeAppAlert = await this.alertController
        .create({
          header: "Confirmation",
          message: "Do you want to close the app?",
          backdropDismiss: false,
          buttons: [
            {
              text: "Stay",
              role: "cancel",
              handler: () => {
                this.closeAppAlert = null;
              },
            },
            {
              text: "Exit",
              handler: () => {
                let navigator: any;
                navigator["app"].exitApp();
              },
            },
          ],
        })
        this.closeAppAlert.present();
    }
  }

  selectIndex(p: any) {
  }
}
