import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/provider/alert.service';

@Component({
  selector: 'app-loan-calculator',
  templateUrl: './loan-calculator.page.html',
  styleUrls: ['./loan-calculator.page.scss'],
})
export class LoanCalculatorPage implements OnInit {

  loanAmount: any;
  annualRate: any;
  loanTeam: any;
  monthlyRepayment: any;
  principalPaid: any;
  interestPaid: any;
  totalRepaymentsPaid: any;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
  }


  // calculate value
  async calculateValue() {
    let errMsg = '';
    if(!this.loanAmount) {
      errMsg = "Please enter loan amount"
    } else if(!this.annualRate) {
      errMsg = "Please enter annual rate";
    } else if(!this.loanTeam) {
      errMsg = "Please select total years"
    }

    if(errMsg) {
      await this.alertService.presentToast(errMsg);
      return;
    } 

    var p = this.loanAmount; //principal amount
    var annualRate = this.annualRate; 
    var i = annualRate / 12 / 100;  //Rate of interest
    var years = this.loanTeam; 
    var n = years * 12;  //Time period 

    // Monthly Repayment
    let monthlyRepayment = (p * i * (Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1));
    this.monthlyRepayment = monthlyRepayment.toLocaleString("en-IN")

    // principal Paid (P)
    this.principalPaid = p.toLocaleString("en-IN");

    // Interest Paid (I)
    let interestPaid = (monthlyRepayment * n) - p;
    this.interestPaid = interestPaid.toLocaleString("en-IN")

    // Total Repayments Paid(P + I)
    this.totalRepaymentsPaid = (p + interestPaid).toLocaleString("en-IN")

  }

  // reset value
  async resetValue() {
    this.loanAmount = '';
    this.annualRate = '';
    this.loanTeam = '';

    this.monthlyRepayment = '';
    this.principalPaid = '';
    this.interestPaid = '';
    this.totalRepaymentsPaid = '';
  }
}
