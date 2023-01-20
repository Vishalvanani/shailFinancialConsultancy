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
      icon: "../../assets/imgs/calculator.png",
      route: "calculator"
    },
    {
      title: "Courses",
      icon: "../../assets/imgs/courses.png",
      route: "courses"
    },
    {
      title: "Income/Expense Manager",
      icon: "../../assets/imgs/iemanager.png",
      route: "income-expense"
    },
    {
      title: "Signup",
      icon: "../../assets/imgs/signup.png",
      route: "signup"
    },
    {
      title: "Appointment Booking",
      icon: "../../assets/imgs/appointment.png",
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
