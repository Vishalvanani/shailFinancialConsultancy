import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/provider/alert.service';
import { HttpService } from 'src/app/provider/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  videoList: any[] = [];

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
    // {
    //   title: "Signup",
    //   icon: "../../assets/imgs/signup.png",
    //   route: "signup"
    // },
    {
      title: "Appointment Booking",
      icon: "../../assets/imgs/appointment.png",
      route: "appointment-booking"
    }
  ]

  constructor(private router: Router, private httpService: HttpService, private alertService: AlertService,
    private _sanitizer: DomSanitizer) { }

  async ngOnInit() {
    await this.alertService.presentLoader('');
    await this.fetchVideoList();
    await this.alertService.dismissLoader();
  }

  fetchVideoList() {
    this.httpService.get(`list_video.php`).subscribe(res => {
      this.videoList = res.items;
      this.videoList.forEach(element => {
        element.url = element.video_url.replace("watch?v=", "embed/");
      });
      
      console.log('this.videoList: ', this.videoList);
    }, (err) => {
      console.log('err: ', err);
    })
  }

  openPage(item: any) {
    this.router.navigateByUrl(item.route)
  }
}


@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
