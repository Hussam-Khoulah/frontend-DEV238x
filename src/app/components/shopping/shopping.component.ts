import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
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
  visibleProductsCount = 0;
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
              private cartService: CartService,
              private title: Title) {
  }

  ngOnInit() {
    this.title.setTitle(`Grocery live - Categories`);
    this.productService.fetch().subscribe(data => {
      this.products = data;
      // rubric27
      this.activatedRoute.queryParams.subscribe(params => {
        this.subcategoryName = params['name'];

        if (this.subcategoryName) { this.title.setTitle(`Grocery live - ${this.subcategoryName}`); }

        if (this.subcategoryName) {
          this.subcategory = this.productService.findSubcategory(this.products, this.subcategoryName);
          this.subcategory.itemsInOriginalSorting = [...this.subcategory.items];
          // rubric28
          this.visibleProductsCount = this.inStockOnly ?
            this.subcategory.items.filter(item => item.stock > 0).length :
            this.subcategory.items.length;
        } else {
          this.subcategory = {};
        }
      });
    });
  }

  // rubric30
  onAddToCart(item) {
    this.cartService.addItem({...item, qty: 1 });
    this.cartService.fetch().subscribe(data => {
      console.log(data);
    });
  }

  onShowInStock() {
    this.inStockOnly = !this.inStockOnly;
    // rubric28
    this.visibleProductsCount = this.inStockOnly ?
      // rubric29
      this.subcategory.items.filter(item => item.stock > 0).length :
      this.subcategory.items.length;
  }

  // rubric33
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
