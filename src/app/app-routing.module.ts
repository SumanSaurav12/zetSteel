import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CustomerComponent } from './components/customer/customer.component';
import { SalesComponent } from './components/sales/sales.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { HomePageComponent } from './pages/homePage/home-page.component';
import { ProductListingComponent } from './pages/product-listing/product-listing.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'sales', component: SalesComponent },
  { path: 'supplier', component: SupplierComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'category/:id', component: ProductListingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
