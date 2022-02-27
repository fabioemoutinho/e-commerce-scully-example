import { Component } from '@angular/core';
import { isScullyRunning } from '@scullyio/ng-lib';
import { CartStore } from './cart/cart.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [CartStore],
})
export class AppComponent {
  readonly isScullyRunning: boolean = isScullyRunning();
  isMobileMenuOpen = false;
}
