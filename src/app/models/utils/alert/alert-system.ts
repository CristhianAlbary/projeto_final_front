import { AlertController } from '@ionic/angular';

export class AlertSystem {

    public alertController: AlertController = new AlertController();

    constructor() { }

    public async alertMessage(title: string, message: string) {
        return new Promise<boolean>(async (resolve) => {
            const alert = await this.alertController.create({
                header: title,
                message: message,
                buttons: [
                    {
                        text: 'Cancelar',
                        cssClass: 'danger',
                        handler: () => {
                            resolve(false);
                        }
                    }, {
                        text: 'Ok',
                        cssClass: 'success',
                        handler: () => {
                            resolve(true);
                        }
                    }
                ]
            });

            alert.present();
        });
    }

    public async alertErrorMessage(err, keys) {
        var errorMessage = '';
        keys.forEach(element => {
            if (err[element]) {
                if(err[element]) {
                    errorMessage = "<p>" + errorMessage + err[element] + "</p>";
                }
            }
        });
        const alert = await this.alertController.create({
            header: 'Erro',
            message: errorMessage,
            mode: 'ios',
            id: 'error-message',
            buttons: [
                { text: 'Ok', cssClass: 'success' }
            ]
        });

        alert.present();
    }

}