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
  customerOrderList:any;

  constructor(private http: HttpService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id'];

    this.categories = this.http.getCategory();
    
    this.getAllEnquiries();
  }

  getAllEnquiries() {
    this.http.getOrdersForACustomer(this.customerId).subscribe((res : any) => {
      console.log('res', res)
      console.log(Object.keys(res));
      this.customerOrderList = Object.values(res);
      console.log('this.customerOrderList', this.customerOrderList);
    });
  }

  // TODO remove
  onCategoryChange(category: any) {}

}
