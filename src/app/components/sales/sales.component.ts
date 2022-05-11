import { Component, OnInit } from '@angular/core';
import { enquiries } from 'src/app/model/enquiry';
import { customers } from 'src/app/model/customer';
import { items } from 'src/app/model/item';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmationPopupComponent } from '../confirmation-popup/confirmation-popup.component';
@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  enquiryData = enquiries;
  listData:any = [];
  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
    for (const enquiry of enquiries) {
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
    // console.log('jhsafvcjsdvcb')
    // console.log(enquiries);
    // console.log('this.listData', this.listData);
    
  }

  selectItem(enquiryId: any, event: any) {
    console.log('event', event);
    this.listData.map((enquiry: any) => {
      if(enquiry.id === enquiryId) {
        console.log('khsdgchjkgs')
        enquiry['isSelected'] = event.target.checked;
      }
    });
    console.log('this.listData', this.listData);
  }

  sendEnquiryToSupplier() {
    localStorage.setItem('enquiryList', JSON.stringify(this.listData));
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

}
