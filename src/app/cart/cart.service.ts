import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  getCart(): Observable<number[]> {
    const random: number = this.getRandomNumber(0, 10);
    const items: number[] = [];

    for (let i = 0; i < random; i++) {
      items.push(this.getRandomNumber(1, 10));
    }

    return of(items);
  }

  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
