import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'toast-container',
  templateUrl: './toast-container.component.html',
  styleUrls: ['./toast-container.component.scss'],
})
export class ToastContainerComponent {
  public toasts = this.toastService.toasts$;

  constructor(private toastService: ToastService) {}
}
