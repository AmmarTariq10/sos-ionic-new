import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from 'ionic-angular';

@Injectable()
export class SharedUI {

  public loading: any;
  constructor(public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
  }


  showLoader(msg: string, ani: string) {
    this.loading = this.loadingCtrl.create({
      content: msg,
      spinner: ani
    });

    this.loading.present();
  }

  hideLoader() {
    this.loading.dismiss();
  }

  showToast(message: string, showclosebutton: boolean, text: string) {
    // this.toastMessage = message
    // this.toastDuration = duration
    // this.toastPosition = position
    // this.toastShowCloseButton = showclosebutton
    // this.toastCloseButtonText = text

    const toast = this.toastCtrl.create({
      message: message,
      duration: 4000,
      position: 'bottom',
      showCloseButton: showclosebutton,
      closeButtonText: text
    })

    toast.present()
  }

}