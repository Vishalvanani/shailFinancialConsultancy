import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DownloadDocumentPageRoutingModule } from './download-document-routing.module';

import { DownloadDocumentPage } from './download-document.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DownloadDocumentPageRoutingModule
  ],
  declarations: [DownloadDocumentPage]
})
export class DownloadDocumentPageModule {}
