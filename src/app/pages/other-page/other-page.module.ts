import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtherPageRoutingModule } from './other-page-routing.module';
import { OtherPageComponent } from './other-page.component';
import { FooterModule } from 'src/app/shared/footer/footer.module';
import { HeaderModule } from 'src/app/shared/header/header.module';


@NgModule({
  declarations: [
    OtherPageComponent
  ],
  imports: [
    CommonModule,
    OtherPageRoutingModule
  ]
})
export class OtherPageModule { }
