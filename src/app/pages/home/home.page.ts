import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/provider/alert.service';
import { CommonService } from 'src/app/provider/common.service';
import { HttpService } from 'src/app/provider/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  videoList: any[] = [];

 

  constructor(
    private router: Router,
    private httpService: HttpService,
    private alertService: AlertService,
    public commonService: CommonService
  ) {}

  async ngOnInit() {
    await this.alertService.presentLoader('');

    if(!this.commonService.userData) {
      this.commonService.mainPageCategory = this.commonService.cloneMainPageCategory.filter(ele => {return ele.route != 'income-expense'})
    }

    await this.fetchVideoList();
    await this.alertService.dismissLoader();
  }

  fetchVideoList() {
    this.httpService.get(`list_video.php`).subscribe(
      (res) => {
        this.videoList = res.items;
        this.videoList.forEach((element) => {
          element.url = element.video_url.replace('watch?v=', 'embed/');
        });

        console.log('this.videoList: ', this.videoList);
      },
      (err) => {
        console.log('err: ', err);
      }
    );
  }

  openPage(item: any) {
    this.router.navigateByUrl(item.route);
  }
}

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
