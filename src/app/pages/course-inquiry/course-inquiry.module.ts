import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CourseInquiryPageRoutingModule } from './course-inquiry-routing.module';

import { CourseInquiryPage } from './course-inquiry.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CourseInquiryPageRoutingModule
  ],
  declarations: [CourseInquiryPage]
})
export class CourseInquiryPageModule {}
