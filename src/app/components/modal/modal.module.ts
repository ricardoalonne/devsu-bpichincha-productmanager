import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalConfirmComponent } from './modal-confirm/modal.confirm.component';
import { GoogleModule } from '../google/google.module';

@NgModule({
  declarations: [ModalConfirmComponent],
  imports: [CommonModule, GoogleModule],
  exports: [ModalConfirmComponent],
})
export class ModalModule {}
