import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotfoundComponent } from './notfound.component';
import { GoogleModule } from '../../../components/google/google.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NotfoundComponent],
  imports: [CommonModule, RouterModule, GoogleModule],
})
export class NotfoundModule {}
