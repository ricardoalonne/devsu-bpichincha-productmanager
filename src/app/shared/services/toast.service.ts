import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Toast } from '../models/toast';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toasts: Toast[] = [];
  private toastsSource = new BehaviorSubject<Toast[]>(this.toasts);
  toasts$ = this.toastsSource.asObservable();

  constructor() {}

  showToast(obj: Toast | Toast[]) {
    if (Array.isArray(obj)) {
      this.toasts.push(...obj);
    } else {
      this.toasts.push(obj);
    }

    this.toastsSource.next([...this.toasts]);
  }
}
