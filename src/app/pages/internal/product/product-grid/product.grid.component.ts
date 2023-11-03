import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalConfirmComponent } from '../../../../components/modal/modal-confirm/modal.confirm.component';
import { ProductResponse } from '../../../../models/response/product.response';
import { ProductService } from '../../../../services/product.service';
import { LoaderService } from '../../../../shared/services/loader.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-dsbn-product.grid',
  templateUrl: './product.grid.component.html',
  styleUrls: ['./product.grid.component.scss'],
})
export class ProductGridComponent implements OnInit {
  @ViewChild('modalConfirm') modalConfirm!: ModalConfirmComponent;

  products: ProductResponse[] = [];
  page: number = 0;
  pageSize: number = 5;
  numberPage: number = 0;
  search: string = '';
  rightPanelStyle: any = {};
  currentProduct!: ProductResponse;
  isLoading$ = this.loaderService.isLoading$;

  constructor(
    private productService: ProductService,
    private loaderService: LoaderService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (response: ProductResponse[]) => {
        if (response.length === 0)
          this.toastService.showToast({
            title: 'Sin productos',
            description:
              'No se encontraron productos. Registre algunos y vuelva aqui.',
            severity: 'info',
            autoClosing: true,
          });

        this.products = response;
      },
    });

    this.page = 0;
    this.numberPage = 0;
  }

  onNextPage() {
    this.page += this.pageSize;
    this.numberPage++;
  }

  onPrevPage() {
    if (this.page > 0) {
      this.page -= this.pageSize;
      this.numberPage--;
    }
  }

  onSearchProduct() {
    this.page = 0;
  }

  onPageSizeChanged(value: number = 0) {
    if (value > 0) this.pageSize = value;
    this.page = 0;
    this.numberPage = 0;
  }

  onEdit(product: ProductResponse) {
    this.router.navigate([`/products/edit/${product.id}`], {
      state: product,
    });
  }

  onDetail(product: ProductResponse) {
    this.router.navigate([`/products/detail/${product.id}`], {
      state: product,
    });
  }

  onClearSearchProduct() {
    this.search = '';
  }

  onDelete(product: ProductResponse) {
    const productName = product.name;

    this.modalConfirm.title = `¿Estas seguro de eliminar el producto ${productName}?`;
    this.modalConfirm.message = `El producto ${productName} se eliminará de los registros, esta acción es irreversible.`;
    this.modalConfirm.onOpenModal();

    this.modalConfirm.action.subscribe({
      next: (response: boolean) => {
        if (response && response === true) {
          this.productService.deleteProduct(product.id).subscribe({
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

              this.loadProducts();
            },
            complete: () => {
              this.loadProducts();
            },
          });
        }
      },
    });
  }

  items = [
    {
      name: 'Editar',
      iconName: 'edit',
      action: this.onEdit.bind(this),
    },
    {
      name: 'Detalles',
      iconName: 'visibility',
      action: this.onDetail.bind(this),
    },
    {
      name: 'Eliminar',
      iconName: 'delete',
      action: this.onDelete.bind(this),
    },
  ];
}
