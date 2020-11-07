import { Constants } from 'src/app/models/utils/constants/constants';
import { AlertSystem } from './../../../models/utils/alert/alert-system';
import { Messages } from './../../../models/utils/toast-message/messages';
import { ConnectionManagerService } from 'src/app/services/http/connectionManager/connection-manager.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MenuController, NavController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  public user_form: FormGroup;

  constructor(
    private menuController: MenuController,
    private formBuilder: FormBuilder,
    private navController: NavController,
    private connectionManager: ConnectionManagerService,
  ) { }

  ngOnInit() {
    this.menuController.enable(false);
    this.initializeForm();
  }

  initializeForm() {
    this.user_form = this.formBuilder.group({
      'nome': ['', Validators.required],
      'login': ['', Validators.required],
      'password': ['', Validators.required],
      'password_confirm': ['', Validators.required]
    });
  }

  back() {
    this.navController.back();
  }

  async submitLoginForm(value) {
    if(value.password == value.password_confirm) {
      let user = {
        'nome': value.nome,
        'login': value.login,
        'password': value.password,
        'status': 'A',
        'tipo': 'USU'
      }
      this.connectionManager.apiRequestPost(user, Constants.API_ROUTE.USER.CREATE).then(response => {
        if(response && response['state'] == 200) {
          console.log(response);
        } else {
          new AlertSystem().alertErrorMessage(response['errors'], Constants.OBJECT_KEYS.USER);
        }
      });
    } else {
      new Messages().showErrorMessage('As senhas não conferem.');
    }
  }

}
