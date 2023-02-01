import { Injectable } from '@angular/core';
import {
  ToastController,
  LoadingController,
  AlertController,
} from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  selectedIndex = 0;
  constructor(
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {}

  async presentLoader(message: string) {
    this.loadingCtrl
      .create({
        message,
        duration: 8000,
        backdropDismiss: true,
        mode: 'ios',
      })
      .then((res) => {
        res.present();
      });
  }

  public dismissLoader() {
    this.loadingCtrl
      .dismiss()
      .then((response) => {})
      .catch((err) => {
        console.log('Error occurred : ', err);
      });
  }

  // --- present toast
  async presentToast(msg?: any) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000,
    });
    toast.present();
  }

  alert: any;
  presentAlert(msg: any, title?: any, buttons?: any, cssClass?: any) {
    return new Promise(async (resolve, reject) => {
      this.alert = await this.alertCtrl.create({
        header: title ? title : 'Alert',
        message: msg,
        backdropDismiss: false,
        buttons: buttons
          ? buttons
          : [
              {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                  resolve('');
                },
              },
            ],
      });
      this.alert.present();
      return alert;
    });
  }

  dismissAlert() {
    if (this.alert) {
      this.alert.dismiss();
    }
  }

  // ---- check blank, undefined or null value
  isBlank(val: string): boolean {
    return !(val != '' && val != undefined && val != null);
  }

  makeid(length: any) {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  /**
   * helper function to ask confirmation
   * @returns Promise of type boolean, resolves with true if positive button clicked, false otherwise
   */
  confirm(msg = 'Are you sure?', title = 'Confirmation', positiveBtnText = 'Yes', negativeBtnText = 'No',
    positiveBtnHandler?: Function, negativeBtnHandler?: Function): Promise<boolean> {
    return new Promise(resolve => {
      this.presentAlert(msg, title, [
        {
          text: negativeBtnText,
          handler: () => {
            if (negativeBtnHandler)
              return negativeBtnHandler()
            else
              return resolve(false)
          },
          role: 'cancel'
        },
        {
          text: positiveBtnText,
          handler: () => {
            if (positiveBtnHandler)
              return positiveBtnHandler()
            else
              return resolve(true)
          }
        }
      ])
    })
  }
}
