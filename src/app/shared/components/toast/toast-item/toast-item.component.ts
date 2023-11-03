import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'toast-item',
  templateUrl: './toast-item.component.html',
  styleUrls: ['./toast-item.component.scss'],
})
export class ToastItemComponent implements OnInit {
  @Input() title!: string;
  @Input() description!: string;
  @Input() iconName?: string;
  @Input() severity!: 'success' | 'info' | 'warn' | 'error';
  @Input() autoClosing: boolean = false;

  closeToast = false;
  showToast = true;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnInit(): void {
    if (this.autoClosing) {
      setTimeout(() => this.onCloseToast(), 5000);
    }

    if (!this.iconName) {
      switch (this.severity) {
        case 'success':
          this.iconName = 'check_circle';
          break;
        case 'warn':
          this.iconName = 'warning';
          break;
        case 'info':
          this.iconName = 'info';
          break;
        case 'error':
          this.iconName = 'report';
          break;
        default:
          this.iconName = 'unknown_5';
          break;
      }
    }
  }

  onCloseToast() {
    this.closeToast = !this.closeToast;
    setTimeout(() => {
      const element = this.elementRef.nativeElement;
      this.renderer.removeChild(element.parentElement, element);
    }, 200);
  }

  get toastClass() {
    return {
      'close-toast': this.closeToast,
      'auto-closing': this.autoClosing,
    };
  }
}
