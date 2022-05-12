import { Component, TemplateRef } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";

@Component({
  selector: 'zet-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent {
  modalRef?: BsModalRef;

  isCreditAvail: boolean = false;

  isInsuranceAvail: boolean = false;

  gstNo: string = '';

  constructor(private modalService: BsModalService) {}
 
  handleOrder(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  //
  onCreditAvail(event: any) {
    this.isCreditAvail = event.target.checked;
  }

  onInsuranceAvail(event: any) {
    this.isInsuranceAvail = event.target.checked;
  }

  onGstChange(event: any) {
    this.gstNo = event.target.value;
  }

  reset() {
    this.isCreditAvail = false;
    this.isInsuranceAvail = false;
    this.gstNo = '';
  }

  onSubmit(quote: any) {
    const order = {
      name: quote.name,
      price: quote.price,
      quantity: quote.quantity,
      isCreditAvail: this.isCreditAvail,
      isInsuranceAvail: this.isInsuranceAvail,
      gst: this.gstNo,
      createdAt: Date.now()
    }


    localStorage.setItem('orders', JSON.stringify(order));
  }

}