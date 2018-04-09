import { NetworkProvider } from '../network/network';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Events } from 'ionic-angular';

@Injectable()
export class ServiceLayerProvider {

  baseURL: string = "http://dev20.onlinetestingserver.com/sos-new/request-";
  
  constructor(private network: NetworkProvider, private events: Events) {
    console.log('Hello ServiceLayerProvider Provider');
  }

  checkedLoggedInStatus() {
    if (localStorage.getItem('accessToken')) {
      console.log("User is logged IN");
      this.events.publish('user:login');
    } else {
      this.events.publish('user:logout');
      console.log("token not found");
    }
  }

  activate(data): Observable<any> {
    return this.network.doPost(this.baseURL + "member-search", data);
  }

  logout(): Observable<any> {
    let data = {
      userid: localStorage.getItem('uid'),
    }
    return this.network.doPost(this.baseURL + "logout", data);
  }

  logoutToken() {
    localStorage.clear();
    this.events.publish('user:logout');
  }

  sosCall(data): Observable<any> {
    return this.network.doPost(this.baseURL + "sos-call", data);
  }

}