import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SmartFormPageRoutingModule } from './smart-form-routing.module';

import { SmartFormPage } from './smart-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SmartFormPageRoutingModule
  ],
  declarations: [SmartFormPage]
})
export class SmartFormPageModule {}
