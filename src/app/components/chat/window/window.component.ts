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
  public conversation = [];

  constructor(
    private connectionManager: ConnectionManagerService
  ) { }

  ngOnInit() {
    this.getUsers();
    this.setUserType();
    if (!GenericWs.chatMessage.value) {
      GenericWs.chatMessage.subscribe({
        next: (response) => {
          if (response && response.content) {
            this.conversation.push({ 'status': 'received', 'message': response.content.message, 'date': new Date() });
            this.scrollControll();
          }
        }
      });
    }
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
    if (Session.getSessionItem('user').tipo == 'SUP') {
      this.user_status = 'USU';
    } else {
      this.user_status = 'SUP';
    }
  }

  public scrollControll() {
    var objDiv = document.getElementById("message-area");
    objDiv.scrollTop = objDiv.scrollHeight;
    if (this.conversation.length >= 1) {
      setTimeout(() => {
        document.getElementById('msg-' + (this.conversation.length - 1).toString()).scrollIntoView();
      }, 150);
    }
  }

  public sendMessage(from, to) {
    if (this.user_selected) {
      let inputMessage = <HTMLInputElement>document.getElementById('message');
      this.messages.push({ 'message': inputMessage.value, 'status': 'send', 'date': new Date() });
      this.startConversation(inputMessage.value);
      new Message({ 'from': from, 'to': to, 'message': inputMessage.value }).sendMessage(this.connectionManager);
      this.clear(inputMessage);
    }
  }

  public setSelected(user) {
    this.users.forEach(element => {
      user.id == element.id ? element.selected = true : element.selected = false;
    });
    this.user_selected = user;
    new Message(null).getConversation(this.connectionManager, Session.getSessionItem('user').id, this.user_selected.id).then(response => {
      if(response && response.length >= 1) {
        response.forEach(element => {
          if(element.usu_origem == Session.getSessionItem('user').id) {
            this.conversation.push({ 'status': 'send', 'message': element.mensagem, 'date': element.created_at });
          } else {
            this.conversation.push({ 'status': 'receive', 'message': element.mensagem, 'date': element.created_at });
          }
        });
        this.scrollControll();
      } 
    });
  }

  public startConversation(message) {
    this.conversation.push({ 'status': 'send', 'message': message, 'date': new Date() });
  }

  public clear(input: HTMLInputElement) {
    input.value = null;
    input.focus();
    this.scrollControll();
  }

}
