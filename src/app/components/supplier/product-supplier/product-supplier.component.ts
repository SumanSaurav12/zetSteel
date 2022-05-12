import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-product-supplier',
  templateUrl: './product-supplier.component.html',
  styleUrls: ['./product-supplier.component.scss']
})
export class ProductSupplierComponent implements OnInit {

  filteredEnquiryForSupplier:any = [];
  supplierId = '';
  hasError = false;

  constructor(
    private http: HttpService, 
    private _route: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.supplierId = this._route.snapshot.params['id'];
    this.getAllEnquiries();
    console.log('selected supplier - ', this.supplierId);
  }

  getAllEnquiries() {
    const allEnquiries = this.http.getSalesEnquiryList();
    console.log('allEnquiries', allEnquiries);
    const filteredEnquiryForSupplier = allEnquiries.filter((data: any) => (data.supplierIds.filter((supplierId: any)=> supplierId === this.supplierId)).length && data.isSelectedBySalesForSendingEnquiry);
    this.filteredEnquiryForSupplier = [];
    let enquiryMapper: any = {};
    for (const enquiry of filteredEnquiryForSupplier) {
      let newObj = {
        createdAt: enquiry.createdAt,
        customerId: enquiry.customerId,
        itemId: enquiry.itemId,
        itemName: enquiry.itemName,
        location: enquiry.location,
        quantity: enquiry.quantity,
        supplierIds: enquiry.supplierIds,
        supplierId: this.supplierId
      }
      let eq = enquiryMapper[enquiry.itemId];
      if (!eq) {
        enquiryMapper[enquiry.itemId] = enquiry.quantity;
        this.filteredEnquiryForSupplier.push(newObj);
      } else {
        enquiryMapper[enquiry.itemId] += enquiry.quantity;
      }
    }

    let idKeys = Object.keys(enquiryMapper);
    idKeys.map(key => {
      let cumulativeQuantity = enquiryMapper[key];
      this.filteredEnquiryForSupplier.map((eq: any) => {
        if (eq.itemId === key) {
          eq.quantity = cumulativeQuantity;
        }
      })
    });

    console.log('enquiryMapper', enquiryMapper);
  }

  setIsSelectedByProductSupplier(enquiryId: any, event: any) {
    console.log('event', event);
    this.filteredEnquiryForSupplier.map((enquiry: any) => {
      if(enquiry.id === enquiryId) {
        enquiry['isSelectedByProductSupplier'] = event.target.checked;
      }
    });
  }

  setDate(enquiryId: any, event: any) {
    console.log(event);
    this.filteredEnquiryForSupplier.map((enquiry: any) => {
      if(enquiry.id === enquiryId) {
        enquiry['deliveryDate'] = event.target.value;
      }
    });
  }

  setPrice(enquiryId: any, event: any) {
    console.log(event);
    this.filteredEnquiryForSupplier.map((enquiry: any) => {
      if(enquiry.id === enquiryId) {
        enquiry['productPrice'] = event.target.value;
      }
    });
  }

  sendResponseToSales() {
    console.log('this.filteredEnquiryForSupplier', this.filteredEnquiryForSupplier);
    const selectedRespToSend = this.filteredEnquiryForSupplier.filter((enquiry: any) => enquiry.isSelectedByProductSupplier);
    console.log('selectedRespToSend', selectedRespToSend);
    if (selectedRespToSend.length) {
      this.hasError = false;
      this.http.setProductSupplierRespList(selectedRespToSend);
      this.toastr.success('Product supplier response submitted to Sales');
    } else {
      this.hasError = true;
    }
  }

}
