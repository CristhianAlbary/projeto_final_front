import { Constants } from 'src/app/models/utils/constants/constants';
import { GenericWs } from 'src/app/models/entity/generics/websocket/generic-ws';
import { ConnectionManagerService } from './../../http/connectionManager/connection-manager.service';
import { WebsocketConnectionService } from './../../websocket/websocket-connection.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Session } from 'src/app/models/utils/session/session';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebsocketGuardService implements CanActivate {

  public genericWs: GenericWs;

  constructor(
    private connectionManager: ConnectionManagerService
  ) {
    this.genericWs = new GenericWs(this.connectionManager);
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    return true;
  }

  public reconnect() {
    let ws = new WebsocketConnectionService(this.connectionManager);
    if (!ws.checkConnectionState()) {
      ws.openWsConnection();
      setTimeout(() => {
        if(Session.getSessionItem('user')) {
          this.wsMessage(Constants.CLASS_NAME.UserConnWebSocket, Session.getSessionItem('user').id);
        }
      }, 250);
    }
  }

  public wsMessage(className: string, params: Array<any>) {
    let serverClass = this.genericWs.serverClass(params);
    if (WebsocketConnectionService.ws && WebsocketConnectionService.ws.readyState === 1) {
      new WebsocketConnectionService(this.connectionManager).wsSendMessage(serverClass[className]);
    }
  }

  public connectionUserSubscribe() {
    GenericWs.webSocketUserConn.subscribe({
      next: response => {
        if (response && response != 0) {
          Session.setSessionItem('users', response.content);
          GenericWs.onlineUsers.next(1);
        }
      }
    });
  }

}
