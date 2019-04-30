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
  inStockOnly = false;
  sortingOptions: any = {
    None: 'None',
    Price: 'price',
    Alphabetical: 'name',
    Rating: 'rating'
  };
  sortingKeys = Object.keys(this.sortingOptions);

  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private cartService: CartService) {
  }

  ngOnInit() {
    this.productService.fetch().subscribe(data => {
      this.products = data;
      this.activatedRoute.queryParams.subscribe(params => {
        this.subcategoryName = params['name'];
        if (this.subcategoryName) {
          this.subcategory = this.productService.findSubcategory(this.products, this.subcategoryName);
          this.subcategory.itemsInOriginalSorting = [...this.subcategory.items];
        } else {
          this.subcategory = {};
        }
      });
    });
  }

  onAddToCart(item) {
    this.cartService.addItem(item, 1);
    this.cartService.fetch().subscribe(data => {
      console.log(data);
    });
  }

  onSortProducts(event) {
    const sortingOption = this.sortingOptions[event.target.value];
    if (sortingOption !== 'None') { // price, name, rating
      this.subcategory.items.sort((a, b) => {
        if (a[sortingOption] < b[sortingOption]) { return -1; }
        if (a[sortingOption] > b[sortingOption]) { return 1; }
        return 0;
      });
    } else { // None
      this.subcategory.items = [...this.subcategory.itemsInOriginalSorting];
    }
  }
}
