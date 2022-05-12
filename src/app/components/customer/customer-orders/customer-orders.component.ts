import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.scss']
})
export class CustomerOrdersComponent implements OnInit {

  categories: any;

  customerId: any;

  constructor(private http: HttpService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id'];

    this.categories = this.http.getCategory();
  }

  // TODO remove
  onCategoryChange(category: any) {}

}
