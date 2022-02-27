import { Component } from '@angular/core';
import { isScullyRunning } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
import { Product } from '../product/product.model';
import { ProductService } from '../product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  readonly products$: Observable<Product[]> = this.productService.getProducts();

  constructor(private readonly productService: ProductService) {}

  onLoadImage(e: Event): void {
    if (!isScullyRunning()) {
      (e.target as HTMLElement).classList.remove('not-loaded');
    }
  }

  onErrorImage(e: Event): void {
    if (!isScullyRunning()) {
      (e.target as HTMLElement).classList.add('not-loaded');
    }
  }
}
