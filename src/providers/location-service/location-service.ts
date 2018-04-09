import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
@Injectable()
export class LocationServiceProvider {

  data = {
    lat: "",
    lng: ""
  }

  constructor(private geolocation: Geolocation) {
    console.log('Hello LocationServiceProvider Provider');
  }

  getLocation(): Promise<any> {
    let options = {
      frequency: 3000,
      enableHighAccuracy: true
    };

    return new Promise((resolve) => {

      this.geolocation.getCurrentPosition(options)
        .then(position => {
          console.log(position.coords.latitude + ' ' + position.coords.longitude);
          this.data.lat = position.coords.latitude.toString();
          this.data.lng = position.coords.longitude.toString();
          resolve(this.data);
        })
        .catch((error) => {
          console.log(error);
          resolve(false);
        });
    });

  }

}


