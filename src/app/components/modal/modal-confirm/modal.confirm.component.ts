import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'modal-confirm',
  templateUrl: './modal.confirm.component.html',
  styleUrls: ['./modal.confirm.component.scss'],
})
export class ModalConfirmComponent implements OnInit, OnDestroy {
  @ViewChild('modal') modal!: ElementRef;

  @Input() title!: string;
  @Input() message!: string;
  @Input() closeButtonLabel: string = 'Cancelar';
  @Input() actionButtonLabel!: string;
  action = new EventEmitter();

  isOpenModal: boolean = false;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.listen('window', 'click', (e) => {
      if (this.modal && e.target === this.modal.nativeElement)
        this.isOpenModal = false;
    });
  }

  ngOnDestroy(): void {
    this.action.unsubscribe();
  }

  onOpenModal() {
    this.action = new EventEmitter();
    this.isOpenModal = true;
  }

  onCloseModal() {
    this.isOpenModal = false;
  }

  onActionModal() {
    this.action.emit(this.isOpenModal);
    this.onCloseModal();
  }
}
