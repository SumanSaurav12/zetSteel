import { Component, OnInit } from '@angular/core';
import { enquiries } from 'src/app/model/enquiry';
import { customers } from 'src/app/model/customer';
import { items } from 'src/app/model/item';
import { ConfirmationPopupComponent } from '../confirmation-popup/confirmation-popup.component';
import { HttpService } from 'src/app/services/http.service';
import { BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  enquiryData: any = [];
  listData:any = [];
  selectedTab = 'enquiry';
  constructor(private modalService: BsModalService, private http: HttpService) { }

  ngOnInit(): void {
    this.enquiryData = JSON.parse(localStorage.getItem('customerEnquiryList') || '') || [];
    this.setTabData();
    
  }

  setTabData() {
    if (this.selectedTab === 'enquiry') {

      for (const enquiry of this.enquiryData) {
        let item = items.find(item => item.id === enquiry.itemId);
        let customer = customers.find(customer => customer.id === enquiry.customerId);
        let obj = {
          ...enquiry,
          ...(item && {itemName: item.name}),
          ...(customer && {customerName: customer.name}),
          ...(customer && {email: customer.email}),
          ...(customer && {phoneNumber: customer.phoneNumber}),
        }
        this.listData.push(obj);
      }
    } else if (this.selectedTab === 'quotation') {
      let allSalesEnquiries = this.http.getSalesEnquiryList();
      let quotes = [];

      allSalesEnquiries = allSalesEnquiries.filter((eq: any) => eq.isSelectedBySales);

      const allProductSupplierRespList = this.http.getProductSupplierRespList();

      const allTransportSupplierRespList = this.http.getTransportSupplierRespList();

      for (const salesEq of allSalesEnquiries) {

        for(let i = 0; i< salesEq.supplierIds.length; i++) {

          let quote: any = {};

          const productSupplier = allProductSupplierRespList.find((supplier: any) => {
            return salesEq.supplierIds[i] === supplier.supplierId && supplier.itemId === salesEq.itemId
          })

          let tansportSupplier;
          if (productSupplier) {
            tansportSupplier = allTransportSupplierRespList.find((supplier: any) => {
              return productSupplier.supplierId === supplier.productSupplierId && supplier.itemId === salesEq.itemId
            })
          }

          // debugger

          if (productSupplier && tansportSupplier) {
            const quantity = +tansportSupplier.quantity;
            const supplierPrice = +productSupplier.productPrice;
            const totalSupplierPrice = +quantity * supplierPrice;
            const transportPrice = +tansportSupplier.transportPrice;


            const totalPriceBeforGST = totalSupplierPrice + (totalSupplierPrice * 1)/100 + transportPrice + (totalSupplierPrice * 2)/100;
            const totalPriceWithGST = totalPriceBeforGST + (totalPriceBeforGST * 18)/100
            quote.supplierPrice = totalSupplierPrice;
            quote.supplierMargin = 1;
            quote.transportPrice = transportPrice;
            quote.transportMargin = 2;
            quote.totalPrice = totalPriceWithGST;
            quote.expectedDate = productSupplier.deliveryDate;
          }

          if (quote && quote !== {}) {
            quotes.push(quote);
          }

        }


        // TODO make fn in service
        localStorage.setItem('salesQuotationList', JSON.stringify(quotes));

        // let cumulatedItemData = allProductSupplierRespList.find((res: any)=> res.itemId === salesEq.itemId);
        // let quantity = salesEq.quantity;
        // let unitPrice = cumulatedItemData.productPrice;
        // salesEq['finalAmt'] = quantity * unitPrice;
      }

      
    } 
  }


  selectItem(enquiryId: any, event: any) {
    console.log('event', event);
    this.listData.map((enquiry: any) => {
      if(enquiry.id === enquiryId) {
        console.log('khsdgchjkgs')
        enquiry['isSelectedBySales'] = event.target.checked;
      }
    });
    console.log('this.listData', this.listData);
  }

  setTab(tab: any) {
    this.selectedTab = tab;
    this.setTabData();
    
  }

  sendEnquiryToSupplier() {
    this.http.setSalesEnquiryList(this.listData);
    
    
    // const confirmationData = {
    //   title: 'Delete Bill',
    //   message: 'Are you sure you want to delete the bill?',
    //   confirmationButton: 'Yes',
    //   cancelButton: 'No',
    //   isAction: true
    // };
    // const modalRef = this.modalService.show(ConfirmationPopupComponent, { initialState: confirmationData, class: 'modal-middle' });
    // modalRef.action.subscribe((status) => {
    //   if (status) {
        
    //   }
    // });
  }

  sendQuotation() {
    const array = [
      {
        "customerId": "customer1",
        "customerName": "Aakanksha",
        "date": 1652305581,
        "itemId": "item2",
        "itemName": "Pipes",
        "price": 800,
        "quantity": 3000
      },
      {
        "customerId": "customer1",
        "customerName": "Aakanksha",
        "date": 1652305581,
        "itemId": "item2",
        "itemName": "Pipes",
        "price": 400,
        "quantity": 3000
      },
      {
        "customerId": "customer1",
        "customerName": "Aakanksha",
        "date": 1652305581,
        "itemId": "item1",
        "itemName": "TMT bar",
        "price": 800,
        "quantity": 3000
      }
    ];
    // for (const iterator of array) {
    //   let result = this.http.postQuotations(iterator).subscribe(resp => {
    //     console.log('return', resp);
    //   });
      
    // }

  }

  approveAllQuotations() {
    
  }

}
