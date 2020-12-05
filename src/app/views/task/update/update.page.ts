import { ConnectionManagerService } from 'src/app/services/http/connectionManager/connection-manager.service';
import { NavController } from '@ionic/angular';
import { AlertSystem } from './../../../models/utils/alert/alert-system';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/entity/generics/task/task';
import { Session } from 'src/app/models/utils/session/session';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {

  public task_form: FormGroup;
  public users = [];

  constructor(
    private formBuilder: FormBuilder,
    private navController: NavController,
    private connectionManager: ConnectionManagerService,
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    new Task(null).findAllUsers(this.connectionManager).then(response => {
      this.users = response;
    });
    this.task_form = this.formBuilder.group({
      'nome': [Session.getSessionItem('upd-task').nome, Validators.required],
      'status': [Session.getSessionItem('upd-task').status, Validators.required],
      'user': [Session.getSessionItem('upd-task').usu_destino.toString(), Validators.required],
      'descricao': [Session.getSessionItem('upd-task').descricao, Validators.required],
      'data': [new Date(Session.getSessionItem('upd-task').updated_at).toISOString().split('T')[0], Validators.required],
    });
  }

  back() {
    this.navController.back();
  }

  async submitLoginForm(value) {
    new Task({
      'id': Session.getSessionItem('upd-task').id,
      'usu_origem': Session.getSessionItem('user').id,
      'usu_destino': value.user,
      'nome': value.nome,
      'descricao': value.descricao,
      'data': value.data,
      'status': value.status
    }).update(this.connectionManager, this.navController);
  }

}
