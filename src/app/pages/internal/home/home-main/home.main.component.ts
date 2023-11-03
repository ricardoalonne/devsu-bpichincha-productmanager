import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/product.service';

@Component({
  selector: 'app-dsbn-home.main',
  templateUrl: './home.main.component.html',
  styleUrls: ['./home.main.component.scss'],
})
export class HomeMainComponent implements OnInit {
  productsTotal = 0;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.productsTotal = response.length;
      },
      error: (error) => {
        this.productsTotal = 0;
      },
    });
  }
}
