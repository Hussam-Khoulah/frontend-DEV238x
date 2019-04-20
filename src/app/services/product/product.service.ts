import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: any = [];

  constructor(private http: HttpClient) {
  }

  /**
   * get all products
   */
  fetch(): Observable<any> {
    return new Observable<any>(obs => {
      if (this.products.length > 0) {
        obs.next(this.products);
      } else {
        this.http.get('https://webmppcapstone.blob.core.windows.net/data/itemsdata.json').subscribe((data: any) => {
          if (data) {
            this.products = data;
            obs.next(this.products);
          }
        });
      }
    });
  }
}
