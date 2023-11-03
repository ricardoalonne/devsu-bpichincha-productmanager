import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductGridComponent } from './product-grid/product.grid.component';
import { ProductRoutingModule } from './product-routing.module';
import { GoogleModule } from '../../../components/google/google.module';
import { ProductFilterPipe } from '../../../pages/internal/product/pipes/product-filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from '../../../components/table/table.module';
import { DropdownModule } from '../../../components/dropdown/dropdown.module';
import { ModalModule } from '../../../components/modal/modal.module';
import { ProductRegisterComponent } from './product-register/product.register.component';
import { ProductEditComponent } from './product-edit/product.edit.component';
import { ProductDetailComponent } from './product.detail/product.detail.component';

@NgModule({
  declarations: [
    ProductGridComponent,
    ProductRegisterComponent,
    ProductEditComponent,
    ProductFilterPipe,
    ProductDetailComponent,
  ],
  imports: [
    CommonModule,

    FormsModule,
    ReactiveFormsModule,

    GoogleModule,
    TableModule,
    DropdownModule,
    ModalModule,

    ProductRoutingModule,
  ],
})
export class ProductModule {}
