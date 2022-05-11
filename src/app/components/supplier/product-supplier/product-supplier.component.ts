import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-product-supplier',
  templateUrl: './product-supplier.component.html',
  styleUrls: ['./product-supplier.component.scss']
})
export class ProductSupplierComponent implements OnInit {

  filteredEnquiryForSupplier:any = [];
  constructor(private http: HttpService) { }
  supplierId = 'supplier1'
  hasError = false;

  ngOnInit(): void {
    this.getAllEnquiries();
  }

  getAllEnquiries() {
    const allEnquiries = this.http.getSalesEnquiryList();
    console.log('allEnquiries', allEnquiries);
    this.filteredEnquiryForSupplier = allEnquiries.filter((data: any) => (data.supplierIds.filter((supplierId: any)=> supplierId === this.supplierId)).length && data.isSelectedBySales);
    console.log('filteredEnquiryForSupplier', this.filteredEnquiryForSupplier);
  }

  setIsSelectedBySupplier(enquiryId: any, event: any) {
    console.log('event', event);
    this.filteredEnquiryForSupplier.map((enquiry: any) => {
      if(enquiry.id === enquiryId) {
        enquiry['isSelectedBySupplier'] = event.target.checked;
      }
    });
    console.log('this.filteredEnquiryForSupplier', this.filteredEnquiryForSupplier);
  }

  sendResponseToSales() {
    console.log()
    const selectedRespToSend = this.filteredEnquiryForSupplier.filter((enquiry: any) => enquiry.isSelectedBySupplier);
    if (selectedRespToSend.length) {
      this.hasError = false;
      this.http.setSupplierRespList(selectedRespToSend);
    } else {
      this.hasError = true;
    }
  }

}
