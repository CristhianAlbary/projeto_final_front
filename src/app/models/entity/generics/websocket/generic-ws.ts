import { ConnectionManagerService } from './../../../../services/http/connectionManager/connection-manager.service';
import { BehaviorSubject } from 'rxjs';
import { Constants } from 'src/app/models/utils/constants/constants';

export class GenericWs {

    public static webSocketUserConn: BehaviorSubject<any> = new BehaviorSubject(0);
    public static onlineUsers: BehaviorSubject<any> = new BehaviorSubject(0);
    public static chatMessage: BehaviorSubject<any> = new BehaviorSubject(0);

    constructor(
        private connectionManager: ConnectionManagerService
    ) { }

    public listenValuesRealTime(data) {
        return {
            WebSocketUserConn: () => {
                GenericWs.webSocketUserConn.next(data);
            },
            ChatMessages: () => {
                GenericWs.chatMessage.next(data);
            },
            TaskReport: () => {
                setTimeout(() => {
                    window.open(Constants.API_ROUTE.SERVER + Constants.API_ROUTE.TASK.REPORT + data.content);
                }, 2000);
            }
        }
    }

    public serverClass(params: any) {
        return {
            WebSocketUserConn: {
                'name': 'WebSocket',
                'class': 'App\\WebSocketServices\\WsAuthenticationService',
                'method': 'authUser',
                'element': 'WebSocketUserConn',
                'params': params
            },
            ChatMessages: {
                'name': 'ChatMessage',
                'class': 'App\\Services\\ChatMessageService',
                'method': 'saveMessage',
                'element': 'ChatMessages',
                'params': params
            },
            TaskReport: {
                'name': 'TaskReport',
                'class': 'App\\WebSocketServices\\WsReportService',
                'method': 'startreportJob',
                'element': 'TaskReport',
                'params': params
            }
        }
    }

}