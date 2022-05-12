import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CustomerComponent } from './components/customer/customer.component';
import { SalesComponent } from './components/sales/sales.component';
import { ProductSupplierComponent } from './components/supplier/product-supplier/product-supplier.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { TransportSupplierComponent } from './components/supplier/transport-supplier/transport-supplier.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { HomePageComponent } from './pages/homePage/home-page.component';
import { ProductListingComponent } from './pages/product-listing/product-listing.component';
import { QuotesComponent } from './pages/quotes/quotes.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'sales', component: SalesComponent },
  { path: 'supplier', component: SupplierComponent },
  { path: 'supplier/:id/transport', component: TransportSupplierComponent },
  { path: 'supplier/:id/product', component: ProductSupplierComponent },
  { path: 'customer/home', component: HomePageComponent },
  { path: 'customer/category/:id', component: ProductListingComponent },
  { path: 'customer/quotes', component: QuotesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
