import { ToastController } from '@ionic/angular';
export class Messages {

    constructor(){}

    public async showErrorMessage(message: string) {
        const toast = await new ToastController().create({
            message: message,
            position: 'top',
            duration: 2000,
            cssClass: 'toast-error',
            color: 'danger'
          });
          toast.present();
    }

}