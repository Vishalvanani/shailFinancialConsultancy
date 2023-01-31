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

  // post(url: string, data: any): Promise<any> {
  //   return new Promise((resolve, reject) => { 
  //     let httpOptions: any = {
  //       headers: new HttpHeaders({
  //         'Access-Control-Allow-Origin': '*',
  //         "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, Accept, Authorization, X-Request-With, Access-Control-Request-Method, Access-Control-Request-Headers",
  //         "Access-Control-Allow-Credentials" : "true",
  //         "Access-Control-Allow-Methods" : "GET, POST, DELETE, PUT, OPTIONS, TRACE, PATCH, CONNECT",
  //       })
  //     }
  //     this.http.post(`${base_URL}${url}`, data, httpOptions).subscribe(res => {
  //       resolve(res);
  //     }, (err) => {
  //       console.log('err: ', err);
  //       reject(err.error.hasOwnProperty('message') ? err.error.message : err.message);
  //     })
  //   })
  // }


  post(url: string, data: any): Observable<any> {

    let httpOptions: any = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, Accept, Authorization, X-Request-With, Access-Control-Request-Method, Access-Control-Request-Headers",
        "Access-Control-Allow-Credentials" : "true",
        "Access-Control-Allow-Methods" : "GET, POST, DELETE, PUT, OPTIONS, TRACE, PATCH, CONNECT",
      })
    }

    return this.http
      .post(base_URL + url, data, httpOptions);
  }


  put(url: string, data: any): Observable<any> {

    let httpOptions: any = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
        "Access-Control-Allow-Methods" : "GET, POST, DELETE, PUT, OPTIONS",
      })
    }
      return this.http
        .put<any>(base_URL + url, data, httpOptions);
  }

  get(url: string, isHeaderAvail?: boolean): Observable<any> {

    // let httpOptions: any = {
    //   headers: new HttpHeaders({
    //     'Access-Control-Allow-Origin': '*',
    //     "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
    //     "Access-Control-Allow-Methods" : "GET, POST, DELETE, PUT, OPTIONS",
    //   })
    // }

      return this.http
        .get<any>(base_URL + url);
  }

  delete(url: string, isHeaderAvail?: boolean): Observable<any> {

    let httpOptions: any = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
        "Access-Control-Allow-Methods" : "GET, POST, DELETE, PUT, OPTIONS",
      })
    }

      return this.http
        .delete<any>(base_URL + url, httpOptions);
  }
}
