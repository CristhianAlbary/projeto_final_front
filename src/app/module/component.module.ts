import { HeaderComponent } from './../components/header/header.component';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from '../components/footer/footer.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    IonicModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})

export class ComponentsModule { }