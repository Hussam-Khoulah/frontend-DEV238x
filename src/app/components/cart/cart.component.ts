import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: any = [];
  subtotal = 0;
  shipping = 0;
  tax = 0;
  total = 0;

  name = '';
  address = '';
  city = '';
  phone = '';

  constructor(private location: Location,
    private cartService: CartService) { }

  ngOnInit() {
    this.items = this.cartService.items;
    this.calcCartSubtotal();
  }

  calcCartSubtotal() {
    if (this.items && this.items.length > 0) {
      this.subtotal = this.items.map(item => item.price * item.qty).reduce((total, itemCost) => total + itemCost);
      this.shipping = this.subtotal ? 10 : 0;
      this.tax = this.subtotal * 0.1;
      this.total = this.subtotal + this.shipping + this.tax;
    }
  }

  onItemQtyChange(event, item, index) {
    if ( Number.parseFloat(event.target.value) <= Number.parseFloat(item.stock)) {
      this.items[index].qty = event.target.value;
      this.calcCartSubtotal();
    } else {
      event.target.value = this.items[index].qty;
    }
  }

  onDeleteItem(event, index) {
    this.items.splice(index, 1);
    console.log(this.cartService.items);
  }

  onSubmit() {
    const result = {
      subtotal: this.subtotal,
      shipping: this.shipping,
      tax: this.tax,
      total: this.total,
      name: this.name,
      address: this.address,
      city: this.city,
      phone: this.phone
    };
    alert(JSON.stringify(result));
  }

  onGoBackClicked() {
    this.location.back();
  }
}
