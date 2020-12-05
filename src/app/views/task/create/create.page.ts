import { ConnectionManagerService } from 'src/app/services/http/connectionManager/connection-manager.service';
import { NavController } from '@ionic/angular';
import { AlertSystem } from './../../../models/utils/alert/alert-system';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/entity/generics/task/task';
import { Session } from 'src/app/models/utils/session/session';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

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
      'nome': ['', Validators.required],
      'user': ['', Validators.required],
      'descricao': ['', Validators.required],
      'data': ['', Validators.required],
    });
  }

  back() {
    this.navController.back();
  }

  async submitLoginForm(value) {
    new Task({
      'usu_origem': Session.getSessionItem('user').id,
      'usu_destino': value.user,
      'nome': value.nome,
      'descricao': value.descricao,
      'data': value.data,
      'status': 'A'
    }).store(this.connectionManager, this.task_form);
  }

}
