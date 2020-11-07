import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(
    private navController: NavController
  ) { }

  ngOnInit() {}

  exit() {
    this.navController.navigateRoot('login');
  }

}
