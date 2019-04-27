import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // todo: full functionality to be added later.
  items: any = [];
  private cartKey = 'GroceryLiveCart';

  constructor() { }

  /**
   * get all items
   */
  fetch(): Observable<any> {
    return new Observable<any>(obs => {
      const storage = JSON.parse(localStorage.getItem(this.cartKey));
      if (storage && storage.length > 0) {
        this.items = Array.isArray(storage) ? storage : [];
      }
      obs.next(this.items);
    });
  }

  addItem(item: any) {
    this.items.push(item);
    localStorage.setItem(this.cartKey, JSON.stringify(this.items));
  }
}
