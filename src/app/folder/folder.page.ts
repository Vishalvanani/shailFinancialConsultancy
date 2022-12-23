import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;

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

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  openPage(item: any) {
    this.router.navigateByUrl(item.route)
  }

}
