import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Task } from 'src/app/models/entity/generics/task/task';
import { Session } from 'src/app/models/utils/session/session';
import { ConnectionManagerService } from 'src/app/services/http/connectionManager/connection-manager.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  public tasks = [];

  constructor(
    private connectionManager: ConnectionManagerService,
    private navController: NavController
  ) { }

  ngOnInit() {
    this.getTasks();
  }

  public getTasks() {
    new Task(null).findByUser(this.connectionManager, Session.getSessionItem('user').id).then(response => {
      this.tasks = response;
    });
  }

  public showTask(task)  {
    Session.setSessionItem('show-task', task);
    this.navController.navigateRoot('mytask/show');
  }

}
