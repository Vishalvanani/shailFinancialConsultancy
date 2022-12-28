import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/provider/alert.service';

@Component({
  selector: 'app-smart-form',
  templateUrl: './smart-form.page.html',
  styleUrls: ['./smart-form.page.scss'],
})
export class SmartFormPage implements OnInit {
note: string = '';
type: any;
amount: any;
category: any;
  constructor(
    public modalCtrl: ModalController,
    public alertService: AlertService,
    ) { }

  ngOnInit() {
  }

  async closeModel() {
    const close: string = "Modal Removed";
    await this.modalCtrl.dismiss(close);
  }
   async submitModel() {
    if(!this.category){
      this.alertService.presentToast('Please select category')
      return false;
    } else if(!this.amount){
      this.alertService.presentToast('Please enter amount')
      return false;
    }else {
      let data = {
        category: this.category, 
        type: this.type, 
        amount: this.amount, 
        note: this.note
      }
      console.log(data);
      await this.modalCtrl.dismiss(data);
      return true;
    }
  }
}
