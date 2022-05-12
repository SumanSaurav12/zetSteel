import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { ToastrService } from 'ngx-toastr';
import { HttpService } from "src/app/services/http.service";

@Component({
  selector: 'zet-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit {
  modalRef?: BsModalRef;

  isCreditAvail: boolean = false;

  isInsuranceAvail: boolean = false;

  quotations: any = [];

  selectedQuotation: any;

  gstNo: string = '';

  constructor(private modalService: BsModalService, private http: HttpService, private toastr: ToastrService) {}

  ngOnInit(): void {
    //TODO Move it to the service
    const customerQuotationList = localStorage.getItem('finalQuotationList');
    if (customerQuotationList !== null) {
      this.quotations = JSON.parse(localStorage.getItem('finalQuotationList') || '') || [];
    }
  }
 
  handleOrder(quotation: any, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);

    this.selectedQuotation = quotation;
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

  onSubmit() {
    const order = {
      name: this.selectedQuotation.name,
      price: this.selectedQuotation.price,
      quantity: this.selectedQuotation.quantity,
      isCreditAvail: this.isCreditAvail,
      isInsuranceAvail: this.isInsuranceAvail,
      gst: this.gstNo,
      createdAt: Date.now()
    }
    
    this.http.setOrderList([order]);
    this.toastr.success('Order has been placed successfully');
    this.modalRef?.hide();
  }

}