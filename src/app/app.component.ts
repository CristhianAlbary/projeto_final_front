import { GenericWs } from './models/entity/generics/websocket/generic-ws';
import { WebsocketGuardService } from './services/guards/websocket/websocket-guard.service';
import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Keyboard } from './models/utils/keyboard/keyboard';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    { title: 'Home', url: 'home', icon: 'home', 'id': 'home' },
    { title: 'Suporte por chat', url: 'chat', icon: 'chatbubbles', 'id': 'suporte' },
    { title: 'Chamados', url: 'task/list', icon: 'document', 'id': 'task-list'},
    { title: 'Meus chamados', url: 'mytask/list', icon: 'documents', 'id': 'my-tasks'}
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private webSocketGuardService: WebsocketGuardService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.startApp();
  }

  public startApp() {
    this.webSocketGuardService.connectionUserSubscribe();
    Keyboard.keyboardListen(this.webSocketGuardService);
  }

  public ionViewWillLeave() {
    GenericWs.webSocketUserConn = new BehaviorSubject(0);
  }

}
