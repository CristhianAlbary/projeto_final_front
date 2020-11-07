import { ArrayUtils } from './../../../models/utils/array/array-utils';
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
  private tryReconnect: number = 0;

  constructor(
    private router: Router,
    private connectionManager: ConnectionManagerService
  ) {
    this.genericWs = new GenericWs(this.connectionManager);
    if (Session.getSessionItem('7265636f6e6578e36f')) {
      this.tryReconnect = parseInt(Session.getSessionItem('7265636f6e6578e36f'));
    } else {
      this.tryReconnect = 0;
    }
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    if (this.tryReconnect <= 3) {
      const reconnect = this.reconnect().ReConn;
      reconnect();
      return true;
    } else {
      this.router.navigateByUrl('login');
    }
  }

  private reconnect() {
    return {
      ReConn: () => {
        let ws = new WebsocketConnectionService(this.connectionManager);
        if (!ws.checkConnectionState()) {
          ws.openWsConnection();
          this.connectionUserSubscribe();
          Session.setSessionItem('7265636f6e6578e36f', this.tryReconnect + 1);
          setTimeout(() => {
            this.wsMessage(Constants.CLASS_NAME.UserConnWebSocket, Session.getSessionItem('user').id);
          }, 250);
        }
      }
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
        if (response) {
          let filter;
          let users: Array<any> = Session.getSessionItem('users');
          if (!users) {
            users = [];
          } else {
            filter = ArrayUtils.arrayFilter(users, 'conn', response.content.conn);
          }
          if (!filter) {
            users.push(response.content);
            Session.setSessionItem('users', users);
          } else {
            console.log('filter', filter);
          }
          console.log(Session.getSessionItem('users'));
        }
      }
    });
  }

}
