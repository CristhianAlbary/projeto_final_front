import { BehaviorSubject } from 'rxjs';
import { WebsocketGuardService } from './../../../services/guards/websocket/websocket-guard.service';
import { AlertController } from '@ionic/angular';
export class Keyboard {

    public static alertController: AlertController = new AlertController();
    public static f5: BehaviorSubject<any> = new BehaviorSubject<any>(false);

    constructor(){}

    public static keyboardListen(service) {
        Keyboard.f5.subscribe({
            next: () => {
                service.reconnect();
            }
        });
        onkeydown = function(event) {
            const keyPressed = Keyboard.keyboardFunctions();
            const keyFunction = keyPressed[event.key];
            keyFunction ? keyFunction() : null;
        }
    }

    public static keyboardFunctions() {
        return {
            F5() {
                Keyboard.f5.next(true);
            }
        }
    }

}