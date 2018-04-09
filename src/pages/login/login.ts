import { Component } from '@angular/core';
import { Events, IonicPage } from 'ionic-angular';
import { SharedUI } from '../../uicomponents/sharedui';
import { ServiceLayerProvider } from '../../providers/service-layer/service-layer';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  memno: string = '';
  name: string = '';
  lname: string = '';
  err: any;
  erbool: boolean = false;
  constructor(private ui: SharedUI, private service: ServiceLayerProvider, private events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  activator() {

    var regname = /^(\s)*[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*(\s)*$/;
    if (!regname.test(this.name)) {
      this.ui.showToast('Nombre inválido', false, "");
      this.name = "";
      return;
    }

    if (!regname.test(this.lname)) {
      this.ui.showToast('Apellido invalido', false, "");
      this.lname = "";
      return;
    }

    var regnum = /^[a-z0-9]+$/;
    if (!regnum.test(this.memno)) {
      this.ui.showToast('NUMERO DE SOCIO INVALIDO', false, "");
      this.memno = "";
      return;
    }

    let data = {
      member_no: this.memno
    }

    //Remove any existing Token/User
    localStorage.clear();

    this.ui.showLoader('Iniciar sesión..', 'bubbles');

    this.service.activate(data)
      .subscribe(res => {
        console.log(res);
        this.ui.hideLoader();
        if (res.agentAccessToken != null) {
          localStorage.setItem('accessToken', res.agentAccessToken);
          localStorage.setItem('uid', res.u_id);
          this.events.publish('user:login');
        }
      }, error => {
        this.ui.hideLoader();
        console.log("IN error");
        console.log(error);
        if (error.status == 0) {
          this.ui.showToast('Sin conexión a Internet', false, '');
        } else if (error.status = 404) {
          if (error._body == "") {
            this.ui.showToast(error.statusText, false, '');
          } else {
            this.err = JSON.parse(error._body);
            this.erbool = true;
            this.memno = ""
            // this.ui.showToast(this.err, false, '');
          }
        } else {
          this.ui.showToast('Ocurrió un error', false, '');
        }
      });



  }

}
