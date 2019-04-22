import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product/product.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productName: string = null;
  productObject: any = null;

  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService) { }

  ngOnInit() {
    this.productName =  this.activatedRoute.snapshot.queryParamMap.get('name');
    this.productObject = this.productService.findProduct(this.productService.products, this.productName);
    // todo: populate product page controls
    console.log('=======');
    console.log(this.productObject);
    console.log('=======');
  }

}
