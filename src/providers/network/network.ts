import { RequestOptions, Headers, Http } from '@angular/http';

import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class NetworkProvider {

  constructor(public http: Http) {
    console.log('Hello NetworkProvider Provider');
  }

  doPost(url, data): any {
    return this.http.post(url, data, this.getAuthHeaders())
      .map(res => res.json());
  }

  getAuthHeaders(): any {
    var token = localStorage.getItem('accessToken');

    if (token == null)
      return;
    //Setting the headers
    var header = {
      'Content-Type': 'application/json',
      'Authorization': token
    };

    let headers = new Headers(header);
    let options = new RequestOptions({ headers: headers });
    return options;
  }

  doGet(url): any {
    return this.http.get(url)
      .map(res => res.json());
  }

}
