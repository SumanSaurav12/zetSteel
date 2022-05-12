import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {

  supplierId = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  setSupplierId(event: any) {
    this.supplierId = event.target.value;
  }

  redirectUser(pageToRedirect: any) {
    if (this.supplierId) {
      this.router.navigate(['supplier', this.supplierId , pageToRedirect]);
    }
  }

}
