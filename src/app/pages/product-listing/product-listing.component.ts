import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { HttpService } from "src/app/services/http.service";

@Component({
  selector: 'zet-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss']
})
export class ProductListingComponent implements OnInit {
  categoryId: string = '';

  items: any = [];

  filters: any = [];

  location: string = 'Bangalore';

  constructor(private route: ActivatedRoute, private http: HttpService) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.categoryId = params.get('id') || '';

      this.items = this.http.getProductByCategory(this.categoryId)

      this.filters = this.http.getFiltersByCategory(this.categoryId);

      console.log(this.filters);

    });

  }

  filterChange(parameter: string, facet: any, event: any) {
    const checked = event.target.checked;
    this.items = this.http.applyFilter(parameter, facet, checked);
  }

  updateQuantity(item: any, event: any) {
    const quantity = event.target.value;

    const index = this.items.findIndex((i: any) => i.id === item.id);

    this.items[index].quantity = quantity;

    // const preIndexItems = this.items.slice(0, index).map((item: any) => {
    //   return { ...item };
    // });

    // const selectedItem = { ...item, quantity: quantity };

    // const postIndexItems = this.items.slice(index + 1).map((item: any) => {
    //   return { ...item };
    // });

    // this.items = [...preIndexItems, selectedItem, ...postIndexItems];
  }

  onSubmitEnquiry(item: any) {
    const supplierIds = item.suppliers.map((supplier: any) => supplier.id);
    const enquiry = {
      id: `enquiry${Math.random()}`,
      itemId: item.id,
      itemName: item.name,
      quantity: item.quantity,
      location: this.location,
      customerId: 'customer1',
      supplierIds: supplierIds,
      status: 'OPEN',
      createdAt: Date.now(),
    }
    this.http.setCustomerEnquiryList([enquiry]);
  }
}