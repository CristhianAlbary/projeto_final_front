import { ConnectionManagerService } from 'src/app/services/http/connectionManager/connection-manager.service';
import { NavController } from '@ionic/angular';
import { AlertSystem } from './../../../models/utils/alert/alert-system';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  public task_form: FormGroup;
  public alertSystem: AlertSystem;

  constructor(
    private formBuilder: FormBuilder,
    private navController: NavController,
    private connectionManager: ConnectionManagerService,
  ) { 
    this.alertSystem = new AlertSystem();
  }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.task_form = this.formBuilder.group({
      'nome': ['', Validators.required],
      'descricao': ['', Validators.required],
      'data': ['', Validators.required],
    });
  }

  back() {
    this.navController.back();
  }

  async submitLoginForm(value) {

  }

}
