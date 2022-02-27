import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { isScullyRunning } from '@scullyio/ng-lib';
import { finalize, iif, of, tap } from 'rxjs';
import { CartService } from './cart.service';

export interface CartState {
  items: number[];
  loading: number;
}

@Injectable()
export class CartStore extends ComponentStore<CartState> {
  count$ = this.select((state) => state.items.length);
  items$ = this.select((state) => state.items);
  loading$ = this.select((state) => state.loading !== 0);

  constructor(private readonly cartService: CartService) {
    super({ items: [], loading: 0 });

    this.fetchCarts();
  }

  private readonly updateLoading = this.updater(
    (state, loading: boolean): CartState => ({
      ...state,
      loading: loading ? state.loading + 1 : state.loading - 1,
    })
  );

  private readonly updateCart = this.updater(
    (state, items: number[]): CartState => ({
      ...state,
      items,
    })
  );

  readonly addToCart = this.updater(
    (state, item: number): CartState => ({
      ...state,
      items: [...state.items, item],
    })
  );

  private readonly fetchCarts = this.effect(() => {
    return iif(
      isScullyRunning,
      of(true), // complete if on scully static generation
      (() => {
        this.updateLoading(true);
        return this.cartService.getCart().pipe(
          tap((result) => {
            this.updateCart(result);
          }),
          finalize(() => this.updateLoading(false))
        );
      })()
    );
  });
}
