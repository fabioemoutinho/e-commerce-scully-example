import { Component } from '@angular/core';
import { CartStore } from './cart.store';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  readonly count$ = this.cartStore.count$;
  readonly loading$ = this.cartStore.loading$;

  constructor(private readonly cartStore: CartStore) {}
}
