import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class WebapiServiceProvider {

  // Base URL API
  baseUrl: any;

  constructor(public http: Http) {
    this.baseUrl = "http://192.168.1.59/ionic_api/";
  }

  // POST Method 
  postData(objdata, segment) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      //headers.append('Content-Type', 'application/json;charset=UTF-8');
      this.http.post(this.baseUrl + segment, JSON.stringify(objdata), {
        headers: headers
      }).subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err);
      });
    });
  }

  // GET METHOD
  getData(segment) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      //headers.append('Content-Type', 'application/json;charset=UTF-8');
      this.http.get(this.baseUrl + segment, { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

}
