import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ProductService } from '../../services/product/product.service';
import { CartService } from '../../services/cart/cart.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productName = '';
  product: any = {};
  qty = 0;
  validQty = true;

  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private location: Location,
              private cartService: CartService,
              private title: Title) { }

  ngOnInit() {
    this.title.setTitle(`Grocery live - Product details`);
    this.productName =  this.activatedRoute.snapshot.queryParamMap.get('name');
    if (this.productName) { this.title.setTitle(`Grocery live - ${this.productName}`); }
    if (this.productService.products.length > 0 ) {
      this.product = this.productService.findProduct(this.productService.products, this.productName);
    } else {
      this.productService.fetch().subscribe(data => {
        this.product = this.productService.findProduct(data, this.productName);
      });
    }
  }

  // rubric44
  onAddToCart() {
    if (!(this.qty <= Number.parseFloat(this.product.stock) && (this.qty > 0))) {
      this.validQty = false;
    } else {
      this.validQty = true;
      this.cartService.addItem({ ...this.product, qty: this.qty });
      this.cartService.fetch().subscribe(data => {
        console.log(data);
      });
    }
  }

  // rubric45
  onGoBackClicked() {
    this.location.back();
  }

}
