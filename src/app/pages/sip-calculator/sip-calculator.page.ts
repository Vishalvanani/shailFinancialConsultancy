import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/provider/alert.service';

@Component({
  selector: 'app-sip-calculator',
  templateUrl: './sip-calculator.page.html',
  styleUrls: ['./sip-calculator.page.scss'],
})
export class SipCalculatorPage implements OnInit {

  totalInvestment: any;
  estimatedReturns: any;
  totalValue: any;

  totalYears: any;
  returnRate: any;
  monthlyInvestment: any;

  constructor(private router: Router, private alertService: AlertService) { }

   ngOnInit() {  }



  // calculate value
  async calculateValue() {
    let errMsg = '';
    if(!this.monthlyInvestment) {
      errMsg = "Please enter monthly investment amount"
    } else if(!this.returnRate) {
      errMsg = "Please enter return rate";
    } else if(!this.totalYears) {
      errMsg = "Please enter total years"
    }

    if(errMsg) {
      await this.alertService.presentToast(errMsg);
      return;
    } 

    var investment = this.monthlyInvestment; //principal amount
    var annualRate = this.returnRate; 
    var monthlyRate = annualRate / 12 / 100;  //Rate of interest
    var years = this.totalYears; 
    var months = years * 12;  //Time period 
    this.totalInvestment = (months * investment).toLocaleString('en-IN');

    this.totalValue = Math.floor(investment * (Math.pow(1 + monthlyRate, months) - 1) /monthlyRate).toLocaleString('en-IN');
    this.estimatedReturns = (Math.floor(Number(investment * (Math.pow(1 + monthlyRate, months) - 1) /monthlyRate) - Number(months * investment))).toLocaleString('en-IN')
  }

  // reset value
  async resetValue() {
    this.monthlyInvestment = '';
    this.returnRate = '';
    this.totalYears = '';
    this.totalInvestment = '';
    this.estimatedReturns = '';
    this.totalValue = '';
  }

  goBack() {
    console.log("dfsffd");
    this.router.navigate([''])
  }

}
