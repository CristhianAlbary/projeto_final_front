import { WindowComponent } from './../components/chat/window/window.component';
import { HeaderComponent } from './../components/header/header.component';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from '../components/footer/footer.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    WindowComponent
  ],
  imports: [
    IonicModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    WindowComponent
  ]
})

export class ComponentsModule { }