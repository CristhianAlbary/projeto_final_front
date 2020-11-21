import { GenericWs } from 'src/app/models/entity/generics/websocket/generic-ws';
import { Constants } from 'src/app/models/utils/constants/constants';
import { WebsocketGuardService } from './../../services/guards/websocket/websocket-guard.service';
import { Component, OnInit } from '@angular/core';
import { FileSystem } from 'src/app/models/utils/file/file-system';
import { Session } from 'src/app/models/utils/session/session';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    
  ) { }

  ngOnInit() {
    
  }

  

}
