import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './dropdown.component';
import { GoogleModule } from '../google/google.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [DropdownComponent],
  imports: [CommonModule, RouterModule, GoogleModule],
  exports: [DropdownComponent],
})
export class DropdownModule {}
