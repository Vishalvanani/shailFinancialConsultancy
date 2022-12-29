import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.page.html',
  styleUrls: ['./document-upload.page.scss'],
})
export class DocumentUploadPage implements OnInit {
  imageUrls: any[] = [];
  constructor(
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  async uploadImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
    });
    var imageUrl = image.base64String;
    this.imageUrls.push(`data:image/png;base64,${imageUrl}`);
  }

  async removeImage(i: number) {
    let alert = await this.alertCtrl.create({
      header: 'Attention',
      message: 'Are you sure you want to remove this image?',
      backdropDismiss: false,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
          },
        },
        {
          text: 'Yes',
          role: 'yes',
          handler: () => {
            this.imageUrls = this.imageUrls.filter((image, index) => {
              return index != i;
            });
          },
        },
      ],
    });
    await alert.present();
  }
}
