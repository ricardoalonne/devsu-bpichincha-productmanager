import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeMainComponent } from './home-main/home.main.component';
import { GoogleModule } from '../../../components/google/google.module';

@NgModule({
  declarations: [HomeMainComponent],
  imports: [CommonModule, GoogleModule, HomeRoutingModule],
})
export class HomeModule {}
