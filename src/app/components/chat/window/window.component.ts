import { GenericWs } from 'src/app/models/entity/generics/websocket/generic-ws';
import { Component, OnInit } from '@angular/core';
import { Session } from 'src/app/models/utils/session/session';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss'],
})
export class WindowComponent implements OnInit {

  public messages= [];
  public users;
  public user_selected;

  constructor() {}

  ngOnInit() {
    this.getUsers();
    setTimeout(() => {
      this.scrollControll();
    }, 100);
  }

  public getUsers() {
    GenericWs.onlineUsers.subscribe({
      next: (trigger) => {
        if(trigger == 1) {
          if(Session.getSessionItem('users')){
            this.users = Session.getSessionItem('users');
            if(this.users && this.users.length == 1) {
              this.users[0]['selected'] = true;
            } else {
              this.users.forEach((element, index) => {
                if(index == 0) {
                  element['selected'] = true;
                } else {
                  element['selected'] = false;
                }
              });
            }
          }
        }
      }
    });
  }

  public scrollControll() {
    var objDiv = document.getElementById("message-area");
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  public sendMessage() {
    let input = <HTMLInputElement> document.getElementById('message');
    this.messages.push({'message': input.value, 'status': 'send', 'date': new Date()});
    this.clear(input);
  }

  public setSelected(user) {
    this.users.forEach(element => {
      user.id == element.id ? element.selected = true : element.selected = false;
    });
    this.user_selected = user;
  }

  public clear(input: HTMLInputElement) {
    input.value = null;
    input.focus();
    setTimeout(() => {
      document.getElementById('msg-' + (this.messages.length - 1).toString()).scrollIntoView();
    }, 150);
  }

}
