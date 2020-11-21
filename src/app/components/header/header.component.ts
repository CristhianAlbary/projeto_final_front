import { Session } from 'src/app/models/utils/session/session';
import { AlertSystem } from './../../models/utils/alert/alert-system';
import { WebsocketConnectionService } from 'src/app/services/websocket/websocket-connection.service';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(
    private navController: NavController,
    private ws: WebsocketConnectionService
  ) { }

  ngOnInit() { }

  exit() {
    Session.destroySession();
    try {
      this.ws.wsCloseConnection();
    } catch (error) {
      this.navController.navigateRoot('login');
    }
  }

}
