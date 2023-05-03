import { Component, OnInit } from '@angular/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import * as moment from 'moment';
import { AlertService } from 'src/app/provider/alert.service';
import { CommonService } from 'src/app/provider/common.service';
import { HttpService } from 'src/app/provider/http.service';

@Component({
  selector: 'app-download-document',
  templateUrl: './download-document.page.html',
  styleUrls: ['./download-document.page.scss'],
})
export class DownloadDocumentPage implements OnInit {
  isFileAvailable: boolean = false;
  isShow: boolean = false;
  constructor(
    private commonService: CommonService,
    private alertService: AlertService,
    private httpService: HttpService
  ) {}

  fileUrl: string = '';
  async ngOnInit() {
    if (!this.commonService.userData) {
      this.alertService.presentAlert(
        'Something went wrong. please try again later!'
      );
      return;
    }
    await this.alertService.presentLoader('');
    this.httpService
      .get(`list_files.php?client_id=${this.commonService.userData.e_id}`)
      .subscribe(
        async (res) => {
          console.log('res: 35', res);
          this.alertService.dismissLoader();
          if(res.message) {
            this.isFileAvailable = false;
            this.isShow = true;
          } else {
            // Handle Error
            if (!res || res.items.length == 0) {
              await this.alertService.presentAlert('No record found!');
              return;
            }
  
            let path = res.items[0].pdf_location;
            this.fileUrl = path;
            console.log('this.fileUrl: ', this.fileUrl);
            this.isFileAvailable = true;
            this.isShow = true;
          }

        },
        async (err) => {
          console.log('err: ', err);
          await this.alertService.dismissLoader();
          await this.alertService.presentAlert(err.message);
        }
      );
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

  downloadDocument() {
    this.toDataUrl(this.fileUrl, async (base64: any) => {
      await Filesystem.writeFile({
        path: `${moment().valueOf()}.pdf`,
        data: base64,
        directory: Directory.Documents,
      }).then(
        (res) => {
          console.log('res: ', res);
          this.alertService.presentToast('Document Download Successfully.');
        },
        async (err) => {
          console.log('err: ', err);
          await this.alertService.dismissLoader();
          await this.alertService.presentAlert(err.message);
        }
      );
    });
  }
}