import { Component, OnInit } from '@angular/core';
import { Session } from 'src/app/models/utils/session/session';
import { ConnectionManagerService } from 'src/app/services/http/connectionManager/connection-manager.service';
import { GenericWs } from 'src/app/models/entity/generics/websocket/generic-ws';
import { WebsocketConnectionService } from 'src/app/services/websocket/websocket-connection.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.page.html',
  styleUrls: ['./show.page.scss'],
})
export class ShowPage implements OnInit {

  public task = Session.getSessionItem('show-task');

  constructor(
    private connectionManager: ConnectionManagerService
  ) { }

  ngOnInit() { }

  public print(id) {
    let serverClass = new GenericWs(this.connectionManager).serverClass(id);
    new WebsocketConnectionService(this.connectionManager).wsSendMessage(serverClass['TaskReport']);
  }

}
