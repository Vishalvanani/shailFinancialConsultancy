import { Component, OnInit } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { Camera, CameraResultType } from '@capacitor/camera';
import { AlertController } from '@ionic/angular';
import { base_URL } from 'src/app/app-constant';
import { AlertService } from 'src/app/provider/alert.service';
import { CommonService } from 'src/app/provider/common.service';
import { HttpService } from 'src/app/provider/http.service';

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.page.html',
  styleUrls: ['./document-upload.page.scss'],
})
export class DocumentUploadPage implements OnInit {
  imageUrls: any[] = [];

  aadharFront: string = '';
  isAadharFrontUp: boolean = false;
  aadharBack: string = '';
  isAadharBackUp: boolean = false;
  panCardFront: string = '';
  isPanCardFrontUp: boolean = false;
  panCardBack: string = '';
  isPanCardBackUp: boolean = false;
  bankStatement: string = '';
  isBankStatementUp: boolean = false;
  otherDocuments: any[] = [];
  isOtherDocumentsUp: boolean = false;
  userData: any;

  constructor(
    private alertCtrl: AlertController,
    private commonService: CommonService,
    private httpService: HttpService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.userData = this.commonService.userData;
    this.getUserDocs();
  }

  b64toBlob(dataURI: string, isPdf: boolean = false) {
    
    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: isPdf ? 'application/pdf' : 'image/jpeg' });
}

  async uploadImage(type: string) {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
    });
    var imageUrl = image.base64String;
    imageUrl = `data:image/png;base64,${imageUrl}`;
    
    if(type == 'aadharFront') {
      this.aadharFront = imageUrl; 
      this.isAadharFrontUp = true;
    } 
    if(type == 'aadharBack') {
      this.aadharBack = imageUrl; 
      this.isAadharBackUp = true;
    } 
    if(type == 'panCardFront') {
      this.panCardFront = imageUrl; 
      this.isPanCardFrontUp = true;
    } 
    if(type == 'panCardBack') {
      this.panCardBack = imageUrl; 
      this.isPanCardBackUp = true;
    } 
    if(type == 'bankStatement') {
      this.bankStatement = imageUrl; 
      this.isBankStatementUp = true;
    } 
    if(type == 'otherDocuments') {
      this.otherDocuments.push(imageUrl); 
      this.isOtherDocumentsUp = true;
    } 
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

  async saveImage() {
    await this.alertService.presentLoader('');
    let formData: FormData = new FormData(); 
    formData.append('ud_id', this.userData.e_id); 
    formData.append('user_id', this.userData.e_id);
    if(this.isAadharFrontUp) {
      let blob = this.b64toBlob(this.aadharFront)
      formData.append('adhar_front', blob, 'aadhar_front.jpeg')
    } 
    if(this.isAadharBackUp) {
      let blob = this.b64toBlob(this.aadharBack)
      formData.append('adhar_back', blob, 'adhar_back.jpeg')
    } 
    if(this.isPanCardFrontUp) {
      let blob = this.b64toBlob(this.panCardFront)
      formData.append('pan_front', blob, 'pan_front.jpeg')
    } 
    if(this.isPanCardBackUp) {
      let blob = this.b64toBlob(this.panCardBack)
      formData.append('pan_back', blob, 'pan_back.jpeg')
    } 

    if(this.isBankStatementUp) {
      let blob = this.b64toBlob(this.bankStatement, true);
      formData.append('bank_statement', blob, 'bank_statement.pdf')
    }

    this.httpService.post(`upload_doc.php`, formData).subscribe(async res => {
      console.log('res: ', res);
      this.getUserDocs();
      this.alertService.presentToast("Upload doc successfully");
      this.isAadharBackUp = false;
      this.isAadharFrontUp = false;
      this.isPanCardBackUp = false;
      this.isPanCardFrontUp = false;
      this.isBankStatementUp = false;
      await this.alertService.dismissLoader();
    }, async (err) => {
      console.log('err: ', err);
      await this.alertService.dismissLoader();
    })
  }

  // --- get user docs
  getUserDocs() {
    this.httpService.get('list_userdoc.php').subscribe(res => {
      let specificUserDocs = res.items.find((item: any) => {return (item.user_id === this.userData.e_id && item.ud_id === this.userData.e_id)});
      console.log('specificUserDocs: ', specificUserDocs);

      if(specificUserDocs) {
        if(specificUserDocs.adhar_front) this.aadharFront = `${base_URL}upload/${specificUserDocs.adhar_front}`
        if(specificUserDocs.adhar_back) this.aadharBack = `${base_URL}upload/${specificUserDocs.adhar_back}`
        if(specificUserDocs.pan_front) this.panCardFront = `${base_URL}upload/${specificUserDocs.pan_front}`
        if(specificUserDocs.pan_back) this.panCardBack = `${base_URL}upload/${specificUserDocs.pan_back}`
        if(specificUserDocs.bank_statement) {
          this.bankStatement = `${base_URL}upload/${specificUserDocs.bank_statement}`
          this.imageName = `Filename: -${specificUserDocs.bank_statement}`
          console.log('this.imageName: ', this.imageName);
        } 
      }

    }, (err) => {
      console.log('err: ', err);
    })
  }

  imageName: string = '';
  // --- get teammate logo
  getImage(ev: any) {
    console.log('ev: ', ev);
    if(ev.target.files.length > 0) {
      this.imageName = ev.target.files[0].name
      console.log('this.imageName: ', this.imageName);
      let reader = new FileReader();
      reader.onload = (event:any) => {
        this.bankStatement = event.target.result;
        this.isBankStatementUp = true;
      }
      reader.readAsDataURL(ev.target.files[0]);
    }
  }

  viewDocFile() {
    Browser.open({url: this.bankStatement})
  }
}
