import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BookDTO} from '../model/book-dto';
import {BorrowingDTO} from '../model/borrowing-d-t-o';

@Injectable({
  providedIn: 'root'
})
export class BorrowingService {

  private prefix = 'http://localhost:7300/api/v1';

  constructor(
    private readonly http: HttpClient
  ) { }

  public addBorrowing(borrowing: BorrowingDTO): Observable<BorrowingDTO> {
    return this.http.post<BorrowingDTO>(this.prefix + '/borrowings', borrowing);
  }

}
