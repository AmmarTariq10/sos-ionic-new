import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LocationServiceProvider } from '../../providers/location-service/location-service';
import { ServiceLayerProvider } from '../../providers/service-layer/service-layer';
import { SharedUI } from '../../uicomponents/sharedui';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { NavController } from 'ionic-angular/navigation/nav-controller';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  cls: boolean = false;
  locPoints: any;
  err: any;

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private locService: LocationServiceProvider,
    private service: ServiceLayerProvider,
    private ui: SharedUI,
    private locationAccuracy: LocationAccuracy
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'ADVERTENCIA',
      message: "CONFIRME SU EMERGENCIA",

      buttons: [
        {
          text: 'SI',
          cssClass: 'yesclass',
          handler: data => {
            console.log('Saved clicked');
            this.cls = true;
            this.askLocation();
            // this.getLocs();
          }
        },
        {
          text: 'No',
          cssClass: 'noclass',
          handler: data => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    prompt.present();
  }

  askLocation() {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
      .then(() => {
        this.getLocs();
      }, error => {
        this.cls = false;
        this.ui.showToast('Por favor active la ubicación del GPS', false, '');
      });
  }

  async getLocs() {
    this.locPoints = await this.locService.getLocation();
    console.log(this.locPoints);

    if (this.locPoints == false) {
      this.ui.showToast('No se puede recuperar su ubicación - Acceso ilegal', false, '');
      this.cls = false;
    } else {
      console.log("points calculated");
      this.API();
    }
  }

  API() {

    let data = {
      userid: localStorage.getItem('uid'),
      latitude: this.locPoints.lat,
      longitude: this.locPoints.lng,
    }

    this.service.sosCall(data)
      .subscribe(res => {
        console.log(res);
        setTimeout(() => {
          this.cls = false;
          this.navCtrl.push('MessagePage');
        }, 5000);
      }, error => {
        console.log(error);
        this.cls = false;
        if (error.status == 0) {
          this.ui.showToast('Sin conexión a Internet', false, '');
        } else if (error.status = 404) {

          if (error._body == "") {
            this.ui.showToast(error.statusText, false, '');
          } else {
            this.err = JSON.parse(error._body);
            if (this.err == "no authorization token!" || this.err == "invalid token") {
              this.ui.showToast('Por favor Iniciar sesión', false, '');
              this.service.logoutToken();
              return;
            }
            this.ui.showToast(this.err, false, '');
            this.service.logoutToken();
            return;
          }
        } else {
          this.ui.showToast('Ocurrió un error', false, '');
        }
      });
  }
}
