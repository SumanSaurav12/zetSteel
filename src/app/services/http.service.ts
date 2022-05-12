import { Injectable } from "@angular/core";
import { category } from "../model/category";
import { items } from "../model/item";
import { suppliers } from "../model/supplier";
import { filters } from "../model/filters";
import {
  HttpClient,
  HttpResponse
} from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class HttpService {

  constructor(private http: HttpClient){};

  appliedFilters: any = {};

  items: any = [];

  getCategory() {
    return category;
  }

  // public getQuotationsForCustomer(customerId) {
  //   this.http.get()
  // }

  public postQuotations(body: any) {
    console.log(body);
    // return this.http.post('https://apis-30c9f-default-rtdb.firebaseio.com/quotation.json', body);
  }

  public getOrdersForACustomer(body: any) {
    console.log(body);
    return this.http.post('https://apis-30c9f-default-rtdb.firebaseio.com/order.json', body);
  }

  public setSalesEnquiryList(list: []) {
    // let oldList = this.getSalesEnquiryList();
    // let newList = [...oldList, ...list];
    // localStorage.setItem('salesEnquiryList', JSON.stringify(newList));
    localStorage.setItem('salesEnquiryList', JSON.stringify(list));
  }

  public getSalesEnquiryList() {
    let result = localStorage.getItem('salesEnquiryList') || null;
    return result ? JSON.parse(result) : [];
  }

  public setProductSupplierRespList(list: []) {
    let oldList = this.getProductSupplierRespList();
    let newList = [...oldList, ...list];
    localStorage.setItem('productSupplierRespList', JSON.stringify(newList));
    // localStorage.setItem('productSupplierRespList', JSON.stringify(list));
  }

  public getProductSupplierRespList() {
    let result = localStorage.getItem('productSupplierRespList') || null;
    return result ? JSON.parse(result) : [];
  }

  public setTransportSupplierRespList(list: []) {
    let oldList = this.getTransportSupplierRespList();
    let newList = [...oldList, ...list];
    localStorage.setItem('transportSupplierRespList', JSON.stringify(newList));
    // localStorage.setItem('transportSupplierRespList', JSON.stringify(list));
  }

  public getTransportSupplierRespList() {
    let result = localStorage.getItem('transportSupplierRespList') || null;
    return result ? JSON.parse(result) : [];
  }

  public setFinalQuotationList(list: []) {
    let oldList = this.getFinalQuotationList();
    let newList = [...oldList, ...list];
    localStorage.setItem('finalQuotationList', JSON.stringify(newList));
    // localStorage.setItem('finalQuotationList', JSON.stringify(list));
  }

  public getFinalQuotationList() {
    let result = localStorage.getItem('finalQuotationList') || null;
    return result ? JSON.parse(result) : [];
  }

  public setCustomerEnquiryList(list: any) {
    const oldList = this.getCustomerEnquiryList();
    const newList = [...oldList,...list];
    localStorage.setItem('customerEnquiryList', JSON.stringify(newList));
  }

  public getCustomerEnquiryList() {
    const result = localStorage.getItem('customerEnquiryList');
    return result ? JSON.parse(result) : [];
  }

  public setOrderList(list: any) {
    debugger
    const oldList = this.getOrderList();
    const newList = [...oldList,...list];
    localStorage.setItem('orders', JSON.stringify(newList));
  }

  public getOrderList() {
    const result = localStorage.getItem('orders');
    return result ? JSON.parse(result) : [];
  }

  getProductByCategory(id: string) {
    const itemsByCategory = items.filter((item) => item.category === id);

    // TODO write better logic for this
    let maxPrice: number;
    let minPrice: number;

    for (let i = 0; i < itemsByCategory.length; i++) {
      let itemByCategory: any = itemsByCategory[i];

      maxPrice = Number.MIN_VALUE;
      minPrice = Number.MAX_VALUE;

      const prodSuppliers = suppliers.filter((supplier: any) => supplier.type === 'Product');
      const tansportSuppliers = suppliers.filter((supplier: any) => supplier.type === 'Transport');
      const supplier = prodSuppliers.filter((supplier: any) => { 
      const supplierItem = supplier.items.find((item: any )=> item.id === itemByCategory.id); 
        

        if(supplierItem) {
          if (supplierItem.price > maxPrice) {
            maxPrice = supplierItem.price;
          }
          if (supplierItem.price < minPrice) {
            minPrice = supplierItem.price;
          }
          return true;
        }
        return false;
      });

      itemByCategory.suppliers = [...supplier];
      itemByCategory.tansportSuppliers = [...tansportSuppliers];
      itemByCategory.minPrice = minPrice;
      itemByCategory.maxPrice = maxPrice;
      
      itemsByCategory[i] = { ...itemByCategory };
    }

    this.items = itemsByCategory;
    return itemsByCategory;
    // const itemSuppliers= suppliers.map((supplier) => supplier.item.findIndex());
  }

  getFiltersByCategory(id: string) {
    const filtersByCategory = filters.find(filter => filter.id === id);
    return filtersByCategory ? filtersByCategory : [];
  }

  applyFilter(parameter: string, facet: any, checked: boolean) {
    if (checked) {
      if (!this.appliedFilters[parameter]) {
        this.appliedFilters[parameter] = [facet.value];
      } else {
        this.appliedFilters[parameter].push(facet.value);
      }
    } else {
      const index = this.appliedFilters[parameter].indexOf(facet.value);
      this.appliedFilters[parameter].splice(index, 1);
    }

    return this.getProductsByFilter();
  }

  getProductsByFilter() {
    const items: any = []
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      Object.keys(item.metadata).map(label => {
        if (this.appliedFilters[label] && this.appliedFilters[label].includes(item.metadata[label])) {
          items.push(item);
        }
      })
    }
    console.log(items);
    //TODO check the case when all filters gets removed
    return items.length > 0 ? items: this.items;
  }
}