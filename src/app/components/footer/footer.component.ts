import { Constants } from 'src/app/models/utils/constants/constants';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  public version: string = Constants.APP.VERSION;

  constructor() { }

  ngOnInit() {}

}
