import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {Subject} from 'rxjs';
import {switchMap, takeUntil} from 'rxjs/operators';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CustomerService} from '../../shared/services/customer.service';
import {CustomerDTO} from '../../shared/model/customer-dto';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit, OnDestroy {

  customers: CustomerDTO[];

  destroy$ = new Subject<boolean>();
  getCustomers$ = this.customerService.getCustomers().pipe(takeUntil(this.destroy$));

  constructor(
    private modalService: NgbModal,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.getCustomers$.subscribe(books => this.customers = books);
  }

  addCustomer(modal: TemplateRef<any>) {
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title', }).result.then((customer) => {
      this.customerService.addCustomer(customer).pipe(
        switchMap( () => this.getCustomers$)
      ).subscribe(books => this.customers = books);
    }, (reason) => {
      console.log(reason);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
