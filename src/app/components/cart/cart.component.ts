import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
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
              private cartService: CartService,
              private title: Title) { }

  ngOnInit() {
    this.items = this.cartService.items;
    this.calcCartSubtotal();
    this.title.setTitle('Grocery live - Cart');
  }

  // rubric53
  // The cost details section should update if any items are removed
  // from the shopping cart of if any of the item quantities are
  // updated
  calcCartSubtotal() {
    if (this.items && this.items.length > 0) {
      this.subtotal = this.items.map(item => item.price * item.qty).reduce((total, itemCost) => total + itemCost);
      this.shipping = this.subtotal ? 10 : 0;
      this.tax = this.subtotal * 0.1;
      this.total = this.subtotal + this.shipping + this.tax;
    }
  }

  // rubric55
  // The cost column in the table should update if the quantity input
  // field is changed
  onItemQtyChange(event, item, index) {
    if ( Number.parseFloat(event.target.value) <= Number.parseFloat(item.stock)) {
      this.items[index].qty = event.target.value;
      this.calcCartSubtotal();
    } else {
      event.target.value = this.items[index].qty;
    }
  }

  // rubric54
  // The remove button should remove an item from the shopping
  // cart
  onDeleteItem(event, index) {
    this.items.splice(index, 1);
    // rubric53
    this.calcCartSubtotal();
  }

  // rubric51
  // The checkout button should create an alert based on the users
  // shipping details and total cost.
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
