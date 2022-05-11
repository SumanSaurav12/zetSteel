import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.scss']
})
export class ConfirmationPopupComponent implements OnInit {
  @Input() title: any = '';
  @Input() message: any = '';
  @Input() cancelButton = '';
  @Input() confirmationButton = '';
  @Output() action = new EventEmitter();
  @Input() isAction = false;
  @Input() isGuardPopUp = false;
  subject: Subject<boolean> =new Subject<boolean>();

  constructor(public modalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  public clickOk() {
    this.modalRef.hide();
    this.action.emit(true);
    if (this.isGuardPopUp) {
      this.subject.next(true);
    }
  }
  public clickCancel() {
    this.modalRef.hide();
    if (this.isAction) {
      this.isAction = false;
      this.action.emit(false);
    }
    if (this.isGuardPopUp) {
      this.subject.next(false);
    }
  }

}
