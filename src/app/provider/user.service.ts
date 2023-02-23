import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpService) { }

  fetchUserInfo(userId: any) {
    return this.httpService.get(`list_employee.php?e_id=${userId}`)
  }
}
