import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/homePage/home-page.component';
import { ProductListingComponent } from './pages/product-listing/product-listing.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'category/:id', component: ProductListingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
