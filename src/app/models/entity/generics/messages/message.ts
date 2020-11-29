import { ConnectionManagerService } from './../../../../services/http/connectionManager/connection-manager.service';
import { WebsocketGuardService } from './../../../../services/guards/websocket/websocket-guard.service';
import { GenericWs } from '../websocket/generic-ws';
import { WebsocketConnectionService } from 'src/app/services/websocket/websocket-connection.service';
export class Message {

    public messageObject;

    constructor(messageObject){
        this.messageObject = messageObject;
    }

    public sendMessage(connectionManager: ConnectionManagerService) {
        let serverClass = new GenericWs(connectionManager).serverClass(this.messageObject);
        new WebsocketConnectionService(connectionManager).wsSendMessage(serverClass['ChatMessages']);
        
    }

    public static getMessagesByUser(user) {
        // http GET
    }

}