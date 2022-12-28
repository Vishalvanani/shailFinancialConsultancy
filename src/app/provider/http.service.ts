import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { base_URL } from '../app-constant';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  // Http Options
  httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private http: HttpClient
    ) { }

  post(url: string, data: any, isHeaderAvail?: boolean): Observable<any> {

    if (isHeaderAvail)
      return this.http
        .post(base_URL + url, data, {responseType: 'text'});
    else
      return this.http
        .post(base_URL + url, data, {responseType: 'text'});
  }

  put(url: string, data: any, isHeaderAvail?: boolean): Observable<any> {

    if (isHeaderAvail)
      return this.http
        .put<any>(base_URL + url, data);
    else
      return this.http
        .put<any>(base_URL + url, data);
  }

  get(url: string, isHeaderAvail?: boolean): Observable<any> {

    if (isHeaderAvail)
      return this.http
        .get<any>(base_URL + url);
    else
      return this.http
        .get<any>(base_URL + url);
  }

  delete(url: string, isHeaderAvail?: boolean): Observable<any> {

    if (isHeaderAvail)
      return this.http
        .delete<any>(base_URL + url);
    else
      return this.http
        .delete<any>(base_URL + url);
  }
}
