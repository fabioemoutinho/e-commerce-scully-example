import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransferStateService } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly API = environment.api.url;

  constructor(
    private http: HttpClient,
    private transferState: TransferStateService
  ) {}

  getProducts(): Observable<Product[]> {
    return this.transferState.useScullyTransferState(
      'products',
      this.http.get<Product[]>(`${this.API}/products`)
    );
  }

  getProduct(productId: number): Observable<Product> {
    return this.transferState.useScullyTransferState(
      `product-${productId}`,
      this.http.get<Product>(`${this.API}/products/${productId}`)
    );
  }
}
