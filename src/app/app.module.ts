import { SharedUI } from '../uicomponents/sharedui';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { NetworkProvider } from '../providers/network/network';
import { ServiceLayerProvider } from '../providers/service-layer/service-layer';
import { LocationServiceProvider } from '../providers/location-service/location-service';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { FooterComponent } from '../components/footer/footer';

@NgModule({
  declarations: [
    MyApp,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    NetworkProvider,
    ServiceLayerProvider,
    SharedUI,
    Geolocation,
    LocationAccuracy,
    LocationServiceProvider
  ]
})
export class AppModule { }
