import { Injectable } from "@angular/core";
import { category } from "../model/category";

@Injectable({ providedIn: 'root' })
export class HttpService {

  getCategory() {
    return category;
  }
}