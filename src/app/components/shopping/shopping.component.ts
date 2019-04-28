import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {

  subcategoryName = '';
  subcategory: any = {};
  defaultSubcategory = 'Choose any subcategory';
  products: any = [];

  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private cartService: CartService) {
  }

  ngOnInit() {
    this.productService.fetch().subscribe(data => {
      this.products = data;

      this.activatedRoute.queryParams.subscribe(params => {
        this.subcategoryName = params['name'];

        this.subcategory = this.productService.findSubcategory(this.products, this.subcategoryName);
        console.log(this.subcategory);
      });

    });
  }

  onAddToCart(item) {
    this.cartService.addItem(item, 1);
    this.cartService.fetch().subscribe(data => {
      console.log(data);
    });
  }
}
