import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { ShoppingComponent } from './components/shopping/shopping.component';
import { CartComponent } from './components/cart/cart.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product', component: ProductComponent },
  { path: 'shopping', component: ShoppingComponent },
  { path: 'cart', component: CartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
