import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.scss']
})
export class CustomerOrdersComponent implements OnInit {

  customerId = 'customer1';
  constructor(private _route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.customerId = this._route.snapshot.params['id'];
  }

}
