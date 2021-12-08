import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {CustomerDTO} from '../../../shared/model/customer-dto';
import {ActivatedRoute} from '@angular/router';
import {CustomerService} from '../../../shared/services/customer.service';
import {switchMap, takeUntil, tap} from 'rxjs/operators';
import {BookDTO} from '../../../shared/model/book-dto';
import {BookService} from '../../../shared/services/book.service';
import {BorrowingService} from '../../../shared/services/borrowing.service';
import {BorrowingDTO} from '../../../shared/model/borrowing-d-t-o';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit, OnDestroy {

  customer: CustomerDTO;
  borrowedBooks: BookDTO[];
  bookOptions: BookDTO[];
  selectedBookId: number;
  private destroy$ = new Subject();
  private getBooks$ = this.bookService.getBooks().pipe(takeUntil(this.destroy$));

  constructor(
    private readonly route: ActivatedRoute,
    private readonly customerService: CustomerService,
    private readonly bookService: BookService,
    private readonly borrowingService: BorrowingService
  ) {
  }

  ngOnInit(): void {
    this.getBooks$.subscribe(books => this.bookOptions = books);

    this.route.params.pipe(
      takeUntil(this.destroy$),
      switchMap(params => this.customerService.getCustomer(params.customerId)),
      tap(customer => this.customer = customer),
      switchMap(customer => this.customerService.getBorrowedBooksForCustomer(customer.id))
    ).subscribe(books => this.borrowedBooks = books)
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }

  borrowBook() {
    console.log(this.customer)
    const borrowing = new BorrowingDTO();
    borrowing.customerId = this.customer.id;
    borrowing.bookId = this.selectedBookId;

    this.borrowingService.addBorrowing(borrowing).pipe(
      takeUntil(this.destroy$),
      switchMap(() => this.customerService.getBorrowedBooksForCustomer(this.customer.id))
    ).subscribe(books => this.borrowedBooks = books)
  }
}
