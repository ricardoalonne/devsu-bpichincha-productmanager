import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleModule } from '../../../components/google/google.module';
import { ToastContainerComponent } from './toast-container/toast-container.component';
import { ToastItemComponent } from './toast-item/toast-item.component';

@NgModule({
  declarations: [ToastContainerComponent, ToastItemComponent],
  imports: [CommonModule, GoogleModule],
  exports: [ToastContainerComponent],
})
export class ToastModule {}
