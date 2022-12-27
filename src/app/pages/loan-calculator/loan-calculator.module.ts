import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoanCalculatorPageRoutingModule } from './loan-calculator-routing.module';

import { LoanCalculatorPage } from './loan-calculator.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoanCalculatorPageRoutingModule
  ],
  declarations: [LoanCalculatorPage]
})
export class LoanCalculatorPageModule {}
