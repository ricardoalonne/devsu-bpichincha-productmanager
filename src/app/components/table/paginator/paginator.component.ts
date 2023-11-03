import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'table-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit, OnChanges {
  @Input() numberPage!: number;
  @Input() total!: number;
  @Input() page!: number;
  @Input() pageSize: number = 5;
  @Input() currentTotal!: number;

  @Output() nextPage = new EventEmitter<void>();
  @Output() prevPage = new EventEmitter<void>();
  @Output() pageSizeChanged = new EventEmitter<number>();

  paginationInfo: string = '0 - 0 de 0';
  isLastPage = false;

  constructor() {}
  ngOnInit(): void {}

  ngOnChanges(changes?: SimpleChanges): void {
    const elementFrom = this.numberPage * this.pageSize + 1;
    const elementTo = (this.numberPage + 1) * this.pageSize;
    const total = this.total;

    this.isLastPage = elementTo >= total;

    this.paginationInfo = `${elementFrom > total ? 0 : elementFrom} - ${
      this.isLastPage ? total : elementTo
    } de ${this.total}`;
  }

  onNextPage() {
    this.nextPage.emit();
  }

  onPrevPage() {
    this.prevPage.emit();
  }

  onPageSizeChanged() {
    this.pageSizeChanged.emit(this.pageSize);
  }
}
