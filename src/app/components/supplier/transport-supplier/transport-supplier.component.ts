import { Component, OnInit } from '@angular/core';
import { suppliers } from 'src/app/model/supplier';
import { HttpService } from 'src/app/services/http.service';
@Component({
  selector: 'app-transport-supplier',
  templateUrl: './transport-supplier.component.html',
  styleUrls: ['./transport-supplier.component.scss']
})
export class TransportSupplierComponent implements OnInit {

  filteredEnquiryForSupplier:any = [];
  
  supplierId = 'supplier1';
  hasError = false;
  supplierData = suppliers;

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.getAllEnquiries();
  }

  getAllEnquiries() {
    const allEnquiries = this.http.getSalesEnquiryList();
    console.log('allEnquiries', allEnquiries);
    const filteredEnquiryForSupplier = allEnquiries.filter((data: any) => data.isSelectedBySales);
    this.filteredEnquiryForSupplier = [];

    for (const enquiry of filteredEnquiryForSupplier) {
      for (const supplierId of enquiry.supplierIds) {
        console.log(supplierId);
        let supplier = this.supplierData.find((supplier: any) => supplier.id === supplierId);
        enquiry['fromLocation'] = supplier && supplier.location;
        this.filteredEnquiryForSupplier.push(enquiry);
      }
    }
    console.log('filteredEnquiryForSupplier', filteredEnquiryForSupplier);
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

  setTransportPrice(enquiryId: any, event: any) {
    console.log(event);
    this.filteredEnquiryForSupplier.map((enquiry: any) => {
      if(enquiry.id === enquiryId) {
        enquiry['transportPrice'] = event.target.value;
      }
    });
  }

  sendResponseToSales() {
    console.log('this.filteredEnquiryForSupplier', this.filteredEnquiryForSupplier);
    const selectedRespToSend = this.filteredEnquiryForSupplier.filter((enquiry: any) => enquiry.isSelectedByTransportSupplier);
    console.log('selectedRespToSend', selectedRespToSend);
    if (selectedRespToSend.length) {
      this.hasError = false;
      this.http.setTransportSupplierRespList(selectedRespToSend);
    } else {
      this.hasError = true;
    }
  }

}

