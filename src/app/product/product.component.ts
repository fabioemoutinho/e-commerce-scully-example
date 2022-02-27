import { Component } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { CartStore } from '../cart/cart.store';
import { Product } from './product.model';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  readonly product$: Observable<Product> = this.route.url.pipe(
    switchMap((url: UrlSegment[]) =>
      this.productService.getProduct(parseInt(url[0].path))
    )
  );

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartStore: CartStore
  ) {}

  addToCart(productId: number) {
    this.cartStore.addToCart(productId);
  }
}
