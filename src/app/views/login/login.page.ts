import { WebsocketGuardService } from './../../services/guards/websocket/websocket-guard.service';
import { Session } from 'src/app/models/utils/session/session';
import { AlertSystem } from './../../models/utils/alert/alert-system';
import { ConnectionManagerService } from './../../services/http/connectionManager/connection-manager.service';
import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Constants } from 'src/app/models/utils/constants/constants';
import { WebsocketConnectionService } from 'src/app/services/websocket/websocket-connection.service';
import { AuthGuardService } from 'src/app/services/guards/auth/auth-guard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public login_form: FormGroup;
  public version: string = Constants.APP.VERSION;
  private alertSystem: AlertSystem;

  constructor(
    private menuController: MenuController,
    private formBuilder: FormBuilder,
    private navController: NavController,
    private connectionManagerService: ConnectionManagerService,
    private ws: WebsocketConnectionService,
    private authGuard: AuthGuardService
  ) {
    this.alertSystem = new AlertSystem();
  }

  ngOnInit() {
    Session.destroySession();
    this.menuController.enable(false);
    this.initializeForm();
    if(this.ws.checkConnectionState()) {
      this.ws.wsCloseConnection();
    }
    this.ws.openWsConnection();
  }

  initializeForm() {
    this.login_form = this.formBuilder.group({
      'login': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  createUser() {
    this.navController.navigateRoot('user/create');
  }

  submitLoginForm(value) {
    this.connectionManagerService.apiRequestPost(value, Constants.API_ROUTE.LOGIN).then(response => {
      Session.setSessionItem('user', response['data']);
      if(AuthGuardService.checkAuthState()) {
        this.menuController.enable(true);
        this.navController.navigateRoot('home');
      }
    });
  }

}
