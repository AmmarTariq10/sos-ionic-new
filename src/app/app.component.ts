import { Component, ViewChild } from '@angular/core';
import { Events, Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ServiceLayerProvider } from '../providers/service-layer/service-layer';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild('myNav') nav: NavController
  rootPage: string;

  constructor(platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen, private events: Events, private service: ServiceLayerProvider) {
    platform.ready().then(() => {

      this.events.subscribe('user:login', () => {
        this.rootPage = 'HomePage';
      });

      this.events.subscribe('user:logout', () => {
        this.rootPage = 'LoginPage';
      });

      this.service.checkedLoggedInStatus();

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#064f9b');

      setTimeout(() => {
        this.splashScreen.hide();
      }, 1000);
    });
  }

  popTohome() {

    if (this.nav.getActive().name == 'HomePage') {
    } else {
      this.nav.pop();
    }
  }
}