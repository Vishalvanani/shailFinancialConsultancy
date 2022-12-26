import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.page.html',
  styleUrls: ['./calculator.page.scss'],
})
export class CalculatorPage implements OnInit {

  calculatorList: any[] = [
    {
      title: "SIP Calculator",
      route: "sip-calculator",
    },
    {
      title: "Loan Calculator",
      route: "loan-calculator",
    },
    {
      title: "Insurance Calculator",
      route: "insurance-calculator",
    },
  ];

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  openPage(item: any) {
    this.router.navigateByUrl(item.route)
  }
}
