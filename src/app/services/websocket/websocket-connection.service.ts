import { ConnectionManagerService } from './../http/connectionManager/connection-manager.service';
import { Injectable } from '@angular/core';
import { GenericWs } from 'src/app/models/entity/generics/websocket/generic-ws';

@Injectable({
  providedIn: 'root'
})
export class WebsocketConnectionService {
  public static ws: any;
  public genericWs: GenericWs;
  public wsResponse;

  constructor(
    private connectionManager: ConnectionManagerService
  ) {
    this.genericWs = new GenericWs(this.connectionManager);
  }

  public checkConnectionState() {
    if (WebsocketConnectionService.ws && WebsocketConnectionService.ws.readState === 1) {
      return true;
    } else {
      return false;
    }
  }

  public openWsConnection() {
    WebsocketConnectionService.ws = new WebSocket('ws://localhost:8015');
    this.wsListenEvent();
  }

  public wsListenEvent() {
    WebsocketConnectionService.ws.onmessage = (event) => {
      this.wsResponse = JSON.parse(event.data);
      if (this.wsResponse && this.wsResponse.element) {
        let wsExecute = this.genericWs.listenValuesRealTime(this.wsResponse)[this.wsResponse.element];
        wsExecute();
      }
    }

    WebsocketConnectionService.ws.onerror = (err) => {
      
    }

    WebsocketConnectionService.ws.onclose = () => {
      location.href = '/login';
    }
  }

  public wsSendMessage(data) {
    if (this.checkConnectionState) {
      WebsocketConnectionService.ws.send(JSON.stringify(data));
    }
  }

  public wsCloseConnection() {
    WebsocketConnectionService.ws.close();
  }

}
