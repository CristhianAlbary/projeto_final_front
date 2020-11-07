import { NgModule } from '@angular/core';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { BrowserModule } from '@angular/platform-browser';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Messages } from '../models/utils/toast-message/messages';

@NgModule({
  declarations: [],
  imports: [
    IonicModule.forRoot(),
    HttpClientModule,
  ],
  exports: [
    BrowserModule,
    IonicModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Messages
  ]
})

export class CoreModule { }