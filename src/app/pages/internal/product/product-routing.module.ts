import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductGridComponent } from './product-grid/product.grid.component';
import { ProductRegisterComponent } from './product-register/product.register.component';
import { ProductEditComponent } from './product-edit/product.edit.component';
import { ProductDetailComponent } from './product.detail/product.detail.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: ProductGridComponent },
      { path: 'register', component: ProductRegisterComponent },
      { path: 'edit/:id', component: ProductEditComponent },
      { path: 'detail/:id', component: ProductDetailComponent },
    ]),
  ],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
