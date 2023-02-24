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
  aadharFront: string = '';
  aadharBack: string = '';
  panCardFront: string = '';
  panCardBack: string = '';
  bankStatement: string = '';
  otherDocuments: any[] = [];

  constructor(
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  async uploadImage(type: string) {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
    });
    var imageUrl = image.base64String;
    imageUrl = `data:image/png;base64,${imageUrl}`;
    // this.imageUrls.push(`data:image/png;base64,${imageUrl}`);
    
    if(type == 'aadharFront') this.aadharFront = imageUrl
    if(type == 'aadharBack') this.aadharBack = imageUrl
    if(type == 'panCardFront') this.panCardFront = imageUrl
    if(type == 'panCardBack') this.panCardBack = imageUrl
    if(type == 'bankStatement') this.bankStatement = imageUrl
    if(type == 'otherDocuments') this.otherDocuments.push(imageUrl)
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

  saveImage() {

  }
}
