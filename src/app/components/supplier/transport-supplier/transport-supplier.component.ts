import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { suppliers } from 'src/app/model/supplier';
import { HttpService } from 'src/app/services/http.service';
@Component({
  selector: 'app-transport-supplier',
  templateUrl: './transport-supplier.component.html',
  styleUrls: ['./transport-supplier.component.scss']
})
export class TransportSupplierComponent implements OnInit {

  filteredEnquiryForSupplier:any = [];
  
  supplierId = 'supplier3';
  hasError = false;
  supplierData = suppliers;

  constructor(private http: HttpService,
    private _route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.supplierId = this._route.snapshot.params['id'];
    this.getAllEnquiries();
    console.log('selected supplier - ', this.supplierId);
  }

  getAllEnquiries() {
    const allEnquiries = this.http.getSalesEnquiryList();
    console.log('allEnquiries', allEnquiries);
    const filteredEnquiryForSupplier = allEnquiries.filter((data: any) => data.isSelectedBySales);
    this.filteredEnquiryForSupplier = [];

    for (const enquiry of filteredEnquiryForSupplier) {
      for (const supplierId of enquiry.supplierIds) {
        let transportEnquiry: any = {
          ...enquiry
        };
        let supplier = this.supplierData.find((supplier: any) => supplier.id === supplierId);
        transportEnquiry['fromLocation'] = supplier && supplier.location;
        transportEnquiry['tansportSupplierId'] = this.supplierId;
        transportEnquiry['productSupplierId'] = supplierId;
        this.filteredEnquiryForSupplier.push(transportEnquiry);
      }
    }
    console.log('this.filteredEnquiryForSupplier', this.filteredEnquiryForSupplier);
  }

  setIsSelectedByTransportSupplier(enquiryId: any, event: any) {
    console.log('event', event);
    this.filteredEnquiryForSupplier.map((enquiry: any) => {
      if(enquiry.id === enquiryId) {
        enquiry['isSelectedByTransportSupplier'] = event.target.checked;
      }
    });
  }

  setFrom(enquiryId: any, event: any) {
    console.log(event);
    this.filteredEnquiryForSupplier.map((enquiry: any) => {
      if(enquiry.id === enquiryId) {
        enquiry['from'] = event.target.value;
      }
    });
  }

  setTo(enquiryId: any, event: any) {
    console.log(event);
    this.filteredEnquiryForSupplier.map((enquiry: any) => {
      if(enquiry.id === enquiryId) {
        enquiry['to'] = event.target.value;
      }
    });
  }

  setTransportPrice(enquiryId: any, productSupplierId: any, event: any) {
    this.filteredEnquiryForSupplier.map((enquiry: any) => {
      if(enquiry.id === enquiryId && enquiry.productSupplierId === productSupplierId) {
        enquiry['transportPrice'] = event.target.value;
      }
    });
  }

  sendResponseToSales() {
    console.log('this.filteredEnquiryForSupplier', this.filteredEnquiryForSupplier);
    const selectedRespToSend = this.filteredEnquiryForSupplier.filter((enquiry: any) => enquiry.isSelectedByTransportSupplier);
    console.log('selectedRespToSend', selectedRespToSend);
    if (selectedRespToSend && selectedRespToSend.length) {
      this.hasError = false;
      this.http.setTransportSupplierRespList(selectedRespToSend);
    } else {
      this.hasError = true;
    }
  }

}

