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

  public setSupplierRespList(list: []) {
     localStorage.setItem('supplierRespList', JSON.stringify(list));
  }

  public getSupplierRespList() {
    let result = localStorage.getItem('supplierRespList') || null;
    return result ? JSON.parse(result) : [];
  }
}