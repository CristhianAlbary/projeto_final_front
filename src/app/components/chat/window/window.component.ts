import { ConnectionManagerService } from './../../../services/http/connectionManager/connection-manager.service';
import { Message } from './../../../models/entity/generics/messages/message';
import { GenericWs } from 'src/app/models/entity/generics/websocket/generic-ws';
import { Component, OnInit } from '@angular/core';
import { Session } from 'src/app/models/utils/session/session';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss'],
})
export class WindowComponent implements OnInit {

  public messages = [];
  public user;
  public users = [];
  public user_selected;
  public user_status;

  constructor(
    private ConnectionManagerService: ConnectionManagerService
  ) { }

  ngOnInit() {
    this.getUsers();
    this.setUserType();
    setTimeout(() => {
      this.scrollControll();
    }, 100);
  }

  public getUsers() {
    this.user = Session.getSessionItem('user');
    GenericWs.onlineUsers.subscribe({
      next: (trigger) => {
        if (trigger == 1) {
          this.users = [];
          this.users = Session.getSessionItem('users');
        }
      }
    });
  }

  public setUserType() {
    if(Session.getSessionItem('user').tipo == 'SUP') {
      this.user_status = 'USU';
    } else {
      this.user_status = 'SUP';
    }
  }

  public scrollControll() {
    var objDiv = document.getElementById("message-area");
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  public sendMessage(from, to) {
    if (this.user_selected) {
      let inputMessage = <HTMLInputElement>document.getElementById('message');
      this.messages.push({ 'message': inputMessage.value, 'status': 'send', 'date': new Date() });
      new Message({'from': from, 'to': to, 'message': inputMessage.value}).sendMessage(this.ConnectionManagerService);
      this.clear(inputMessage);
    }
  }

  public setSelected(user) {
    this.users.forEach(element => {
      user.id == element.id ? element.selected = true : element.selected = false;
    });
    this.user_selected = user;
    Message.getMessagesByUser(this.user_selected);
  }

  public clear(input: HTMLInputElement) {
    input.value = null;
    input.focus();
    setTimeout(() => {
      document.getElementById('msg-' + (this.messages.length - 1).toString()).scrollIntoView();
    }, 150);
  }

}
