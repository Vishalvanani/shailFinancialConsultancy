import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { AlertService } from './provider/alert.service';
import { Location } from '@angular/common';
import { Preferences } from '@capacitor/preferences';
import { CommonService } from './provider/common.service';
import { MenuController } from '@ionic/angular';
import { HttpService } from './provider/http.service';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import * as moment from 'moment';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '', icon: 'home' },
    { title: 'About Us', url: '/about-us', icon: 'mail' },
    { title: 'Download', url: '/folder/download', icon: 'download-outline' },
    {
      title: 'Payment Info',
      url: '/folder/payment-info',
      icon: 'information-circle-outline',
    },
    { title: 'Logout', url: '/folder/logout', icon: 'log-out-outline' },
  ];

  accordionList: any[] = [
    {
      title: 'Edit Profile',
      icon: 'create',
      url: '/edit-profile',
    },
    {
      title: 'Document Upload',
      icon: 'add',
      url: '/document-upload',
    },
  ];

  constructor(
    private platform: Platform,
    private _location: Location,
    public alertController: AlertController,
    public router: Router,
    public alertService: AlertService,
    public commonService: CommonService,
    private menu: MenuController,
    private httpService: HttpService
  ) {
    this.platform.backButton.subscribeWithPriority(10, async (res) => {
      console.log('res: ', res);
      await this.getUserDataFromStorage();

      if (
        this._location.isCurrentPathEqualTo('/signup') &&
        !this.commonService.userData
      ) {
        console.log('53');
        this.showExitConfirm();
        return;
      }

      if (!this.commonService.userData) return;

      if (
        this._location.isCurrentPathEqualTo('/folder/home') ||
        this._location.isCurrentPathEqualTo('')
      ) {
        console.log('64');
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
    if (!this.closeAppAlert) {
      this.closeAppAlert = await this.alertController.create({
        header: 'Confirmation',
        message: 'Do you want to close the app?',
        backdropDismiss: false,
        buttons: [
          {
            text: 'Stay',
            role: 'cancel',
            handler: () => {
              this.closeAppAlert = null;
            },
          },
          {
            text: 'Exit',
            handler: () => {
              let navigator: any;
              navigator['app'].exitApp();
            },
          },
        ],
      });
      this.closeAppAlert.present();
    }
  }

  toDataUrl(url: any, callback: any) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }

  async selectIndex(p: any) {
    if (p.url == '/folder/download') {
      this.router.navigate(['/folder/download-document']);
    } else if (p.url == '/folder/payment-info') {
      this.router.navigate([p.url]);
    } else if (p.url == '') {
      this.router.navigate(['']);
    } else if (p.url == '/folder/logout') {
      this.logout();
    } else if (p.url == '/about-us') {
      this.router.navigate(['/about-us']);
    }
    setTimeout(() => {
      this.getSelectedIndex();
    }, 1000);
  }

  getSelectedIndex() {
    const path = window.location.pathname.split('folder/')[1];
    if (path) {
      this.alertService.selectedIndex = this.appPages.findIndex(
        (page) => page.url.toLowerCase() === `/folder/${path.toLowerCase()}`
      );
    } else {
      this.alertService.selectedIndex = 0;
    }
  }

  accordionClick(url: string) {
    this.menu.close();
    this.router.navigate([url]);
  }

  async ngOnInit() {
    setTimeout(() => {
      this.getSelectedIndex();
    }, 2000);

    await this.getUserDataFromStorage();
    if (!this.commonService.userData) {
      this.router.navigate(['']);
    }
  }

  onClick() {}

  async logout() {
    let res = await this.alertService.confirm(
      'Are you sure you want to log out?',
      'Confirmation',
      'Yes',
      'No'
    );
    if (res) {
      Preferences.remove({ key: 'userData' });
      this.commonService.userData = '';
      window.location.reload();
    }
  }

  async getUserDataFromStorage() {
    let userData: any = await Preferences.get({ key: 'userData' });
    if (userData && userData.value)
      this.commonService.userData = JSON.parse(userData.value);
  }
}
