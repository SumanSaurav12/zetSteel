import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/services/http.service";

@Component({
  selector: 'zet-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  categories: any = [];

  constructor(private http: HttpService) {}

  ngOnInit() {
    this.categories = this.http.getCategory();
  }

}