import { Component, Output, EventEmitter } from '@angular/core';
import { ServiceLayerProvider } from '../../providers/service-layer/service-layer';
import { SharedUI } from '../../uicomponents/sharedui';

@Component({
  selector: 'footer',
  templateUrl: 'footer.html'
})
export class FooterComponent {

  @Output() home = new EventEmitter();

  err: any;
  constructor(
    private service: ServiceLayerProvider,
    private ui: SharedUI,
  ) {
    console.log('Hello FooterComponent Component');
  }

  backhome() {
    this.home.emit();
  }

  logout() {
    this.ui.showLoader('Saliendo de tu cuenta..', 'bubbles');
    this.service.logout()
      .subscribe(res => {
        console.log(res);
        this.ui.hideLoader();
        this.service.logoutToken();
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
            if (this.err == "no authorization token!" || this.err == "invalid token") {
              this.ui.showToast('Por favor Iniciar sesión', false, '');
              this.service.logoutToken();
              return;
            }
            this.ui.showToast(this.err, false, '');
          }
        } else {
          this.ui.showToast('Ocurrió un error', false, '');
        }
      });
  }

}
