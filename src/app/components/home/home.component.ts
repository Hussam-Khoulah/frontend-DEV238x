import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { UtilityService } from '../../services/utils/utility.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: any = [];

  constructor(private productService: ProductService,
              private utilityService: UtilityService) { }

  ngOnInit() {
    this.populateCaroucel();
  }

  activateCarousel() {
    $(document).ready(function() {
      $(function () {
        $('#toggleSlideShow').click(function (event) {
          const option = event.target.checked ? { interval: 3000 } : 'pause';
          $('#productCarousel').carousel(option);
        });
      });
    });
  }

  populateCaroucel() {
    if (this.productService.carouselProducts.length > 0) {
      this.products = this.productService.carouselProducts;
      this.activateCarousel();
    } else {
      this.productService.fetch().subscribe(data => {
        // remove subcategory so to make easier to pick 4 products from each category so to populate carousel
        const products = data.map(cat => {
          const catProducts: any = [];
          cat.subcategories.forEach(subCat => {
            catProducts.push(...subCat.items);
          });
          return { category: cat.category, products: catProducts };
        });
        // get 4 random products out of each category
        this.products = products.map(cat => {
          return {
            category: cat.category,
            random4: this.utilityService.getRandomItems(cat.products, 4)
          };
        });
        this.productService.carouselProducts = this.products;
        this.activateCarousel();
      });
    }
  }

}
