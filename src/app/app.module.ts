import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HomePageComponent } from './pages/homePage/home-page.component';
import { BannerComponent } from './components/banner/banner.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductListingComponent } from './pages/product-listing/product-listing.component';
import { NavbarComponent } from './pages/navbar/navbar.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { CustomerComponent } from './components/customer/customer.component';
import { SalesComponent } from './components/sales/sales.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ConfirmationPopupComponent } from './components/confirmation-popup/confirmation-popup.component';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { TransportSupplierComponent } from './components/supplier/transport-supplier/transport-supplier.component';
import { ProductSupplierComponent } from './components/supplier/product-supplier/product-supplier.component';
@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    FooterComponent,
    HomePageComponent,
    ProductItemComponent,
    ProductListingComponent,
    NavbarComponent,
    SalesComponent,
    SupplierComponent,
    CustomerComponent,
    WelcomeComponent,
    ConfirmationPopupComponent,
    TransportSupplierComponent,
    ProductSupplierComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule
  ],
  providers: [BsModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
