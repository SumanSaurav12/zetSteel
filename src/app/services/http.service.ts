import { Injectable } from "@angular/core";
import { category } from "../model/category";

@Injectable({ providedIn: 'root' })
export class HttpService {



  getCategory() {
    return category;
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
     localStorage.setItem('productSupplierRespList', JSON.stringify(list));
  }

  public getProductSupplierRespList() {
    let result = localStorage.getItem('productSupplierRespList') || null;
    return result ? JSON.parse(result) : [];
  }

  public setTransportSupplierRespList(list: []) {
     localStorage.setItem('transportSupplierRespList', JSON.stringify(list));
  }

  public getTransportSupplierRespList() {
    let result = localStorage.getItem('transportSupplierRespList') || null;
    return result ? JSON.parse(result) : [];
  }
}