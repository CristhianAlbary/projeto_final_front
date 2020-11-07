import { AlertController } from '@ionic/angular';
export class Keyboard {

    public static alertController: AlertController = new AlertController();

    constructor(){}

    public static keyboardListen() {
        onkeypress = function(event) {
            const keyPressed = Keyboard.keyboardFunctions();
            const keyFunction = keyPressed[event.key];
            keyFunction ? keyFunction() : null;
        }
    }

    public static keyboardFunctions() {
        return {
            Enter() {
                if(document.getElementById('error-message')) {
                    Keyboard.alertController.dismiss();
                } else {
                    document.getElementById("submit-btn").click();
                }
            },
            F4() {
                return document.getElementById("exit").click();
            }
        }
    }

}