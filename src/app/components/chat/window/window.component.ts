import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss'],
})
export class WindowComponent implements OnInit {

  public message_status;

  constructor() {
    this.message_status = 'to-me'
  }

  ngOnInit() {}

}
