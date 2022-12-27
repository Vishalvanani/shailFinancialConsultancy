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

  toDataUrl(url: any, callback: any) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}

  selectIndex(p: any) {
    console.log('p: ', p);
    if(p.url == "/folder/download") {
      this.toDataUrl("https://www.africau.edu/images/default/sample.pdf", (base64: any) => {
        const downloadPDF = (href: any) => {
          const downloadLink = document.createElement("a");
          downloadLink.href = href;
          downloadLink.download = "fileName.pdf";
          downloadLink.click();
        };
        downloadPDF(base64);
      })
    }
  }
}
