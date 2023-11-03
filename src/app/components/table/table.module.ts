import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './paginator/paginator.component';
import { FormsModule } from '@angular/forms';
import { GoogleModule } from '../google/google.module';

@NgModule({
  declarations: [PaginatorComponent],
  imports: [CommonModule, FormsModule, GoogleModule],
  exports: [PaginatorComponent],
})
export class TableModule {}
