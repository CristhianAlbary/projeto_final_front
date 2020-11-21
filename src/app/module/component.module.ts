import { WindowComponent } from './../components/chat/window/window.component';
import { HeaderComponent } from './../components/header/header.component';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from '../components/footer/footer.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    WindowComponent
  ],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    WindowComponent
  ]
})

export class ComponentsModule { }