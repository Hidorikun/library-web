import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {BookDTO} from '../model/book-dto';
import {HttpClient} from '@angular/common/http';
import {CustomerDTO} from '../model/customer-dto';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private prefix = 'http://localhost:7200/api/v1';

  constructor(
    private readonly http: HttpClient
  ) { }

  public getCustomers(): Observable<CustomerDTO[]> {
    return this.http.get<CustomerDTO[]>(this.prefix + '/customers');
  }

  public getCustomer(customerId: number): Observable<CustomerDTO> {
    return this.http.get<CustomerDTO>(this.prefix + '/customer/' + customerId);
  }

  public getBorrowedBooksForCustomer(customerId: number): Observable<BookDTO[]> {
    return this.http.get<BookDTO[]>(this.prefix + '/customer/' + customerId + 'books');
  }

  public addCustomer(book: BookDTO): Observable<CustomerDTO> {
    return this.http.post<CustomerDTO>(this.prefix + '/customer', book);
  }

}
