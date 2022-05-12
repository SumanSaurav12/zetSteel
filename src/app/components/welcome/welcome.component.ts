import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  customerId = ''
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  redirectUser(pageToRedirect: any) {
    this.router.navigate([pageToRedirect]);
  }

  setCustomerId(event: any) {
    this.customerId = event.target.value;
  }

  redirectToCustomer() {
    if (this.customerId) {
      this.router.navigate(['customer',this.customerId]);
    }
  }

}
