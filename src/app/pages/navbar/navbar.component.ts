import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/services/http.service";

@Component({
  selector: 'zet-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  categories: any = [];

  selectedCategory: any;

  categoryId: string = '';

  items: any = [];

  filters: any = [];

  location: string = 'Bangalore';

  constructor(private http: HttpService) {}

  ngOnInit () {
    this.categories = this.http.getCategory();
  }

  onCategoryChange(category: any) {
    this.selectedCategory = category;

    this.items = this.http.getProductByCategory(this.selectedCategory.id)

    this.filters = this.http.getFiltersByCategory(this.selectedCategory.id);
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
    const transportSupplierIds = item.tansportSuppliers.map((supplier: any) => supplier.id);
    const enquiry = {
      id: `enquiry${Math.random()}`,
      itemId: item.id,
      itemName: item.name,
      quantity: item.quantity,
      location: this.location,
      customerId: 'customer1',
      supplierIds: supplierIds,
      transportSupplierIds: transportSupplierIds,
      status: 'OPEN',
      createdAt: Date.now(),
    }
    this.http.setCustomerEnquiryList([enquiry]);
  }
}