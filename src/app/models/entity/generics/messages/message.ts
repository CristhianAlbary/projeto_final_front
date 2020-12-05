import { Constants } from './../../../utils/constants/constants';
import { ConnectionManagerService } from './../../../../services/http/connectionManager/connection-manager.service';
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

    public getConversation(connectionManager: ConnectionManagerService, idOrigin, idDest) {
        return connectionManager.apiRequestGet(Constants.API_ROUTE.MESSAGES.CONVERSATION + idOrigin + '/' + idDest).then(response => {
            if(response && response['data']) {
                return response['data'];
            }
        });
    }

}