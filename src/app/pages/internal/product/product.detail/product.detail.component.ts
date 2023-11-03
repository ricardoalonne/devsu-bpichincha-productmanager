import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalConfirmComponent } from '../../../../components/modal/modal-confirm/modal.confirm.component';
import { ProductResponse } from '../../../../models/response/product.response';
import { ProductService } from '../../../../services/product.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { DateFormatService } from '../../../../shared/services/date-format.service';

@Component({
  selector: 'app-dsbn-product.detail',
  templateUrl: './product.detail.component.html',
  styleUrls: ['./product.detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  @ViewChild('modalConfirm') modalConfirm!: ModalConfirmComponent;

  protected today = new Date();
  protected currentProduct!: ProductResponse;

  constructor(
    private productService: ProductService,
    private toastService: ToastService,
    private dateFormatService: DateFormatService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const data = history.state;

    this.currentProduct = {
      ...data,
      dateRelease: this.dateFormatService.transform(
        data?.dateRelease ?? this.today
      ),
      dateRevision: this.dateFormatService.transform(
        data?.dateRevision ?? this.today
      ),
    };
  }

  onEdit() {
    this.router.navigate([`/products/edit/${this.currentProduct.id}`], {
      state: this.currentProduct,
    });
  }

  onDelete() {
    const productName = this.currentProduct.name;

    this.modalConfirm.title = `¿Estas seguro de eliminar el producto ${productName}?`;
    this.modalConfirm.message = `El producto ${productName} se eliminará de los registros, esta acción es irreversible.`;
    this.modalConfirm.onOpenModal();

    this.modalConfirm.action.subscribe({
      next: (response: boolean) => {
        if (response && response === true) {
          this.productService.deleteProduct(this.currentProduct.id).subscribe({
            next: (response) => {
              this.toastService.showToast({
                title: 'Producto Eliminado',
                description: 'El producto se ha eliminado correctamente.',
                severity: 'success',
                autoClosing: true,
              });
            },
            error: (error) => {
              this.toastService.showToast({
                title: 'Oops',
                description: 'Ha ocurrido un error al eliminar el producto.',
                severity: 'error',
                autoClosing: true,
              });

              this.router.navigate([`/products`]);
            },
            complete: () => {
              this.router.navigate([`/products`]);
            },
          });
        }
      },
    });
  }
}
