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
                        text: 'Importar',
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
            if(err[element]) {
                err[element].forEach(message => {
                    errorMessage = "<p>" + errorMessage + message + "</p>";
                });
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