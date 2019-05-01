import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { ShoppingComponent } from './components/shopping/shopping.component';
import { CartComponent } from './components/cart/cart.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


const routes: Routes = [
  // rubric13
  { path: '', component: HomeComponent },
  // rubric46
  { path: 'product', component: ProductComponent },
  // rubric34
  { path: 'shopping', component: ShoppingComponent },
  // rubric56
  { path: 'cart', component: CartComponent },
  // rubric62
  { path: 'contact', component: ContactComponent },
  // rubric64
  { path: 'about', component: AboutComponent },
  {path: 'not-found', component: PageNotFoundComponent},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
