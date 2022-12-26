import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  mainPageCategory: any[] = [
    {
      title: "Calculator",
      icon: "calculator-outline",
      route: "calculator"
    },
    {
      title: "Income/Expense Manager",
      icon: "analytics-outline",
      route: "income-expense"
    },
    {
      title: "Courses",
      icon: "book-outline",
      route: "courses"
    },
    {
      title: "Signup",
      icon: "log-in-outline",
      route: "signup"
    },
    {
      title: "Appointment Booking",
      icon: "apps-outline",
      route: "appointment-booking"
    }
  ]

  constructor(private router: Router) { }

  ngOnInit() {

  }

  openPage(item: any) {
    this.router.navigateByUrl(item.route)
  }


}
