import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Task } from 'src/app/models/entity/generics/task/task';
import { Constants } from 'src/app/models/utils/constants/constants';
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
    new Task(null).findAll(this.connectionManager).then(response => {
      this.tasks = response;
    });
  }

  public update(task) {
    Session.setSessionItem('upd-task', task);
    this.navController.navigateRoot('task/update');
  }

}
