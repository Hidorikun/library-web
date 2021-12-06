import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {BookDTO} from '../model/book-dto';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private prefix = 'http://localhost:7100/api/v1';

  constructor(
    private readonly http: HttpClient
  ) { }

  public getBook(id: number): Observable<BookDTO> {
    return this.http.get<BookDTO>(this.prefix + '/book' + id);
  }

  public getBooks(): Observable<BookDTO[]> {
    return this.http.get<BookDTO[]>(this.prefix + '/books');
  }

  public addBook(book: BookDTO): Observable<BookDTO> {
    return this.http.post<BookDTO>(this.prefix + '/book', book);
  }

  public updateBook(book: BookDTO): Observable<BookDTO> {
    return this.http.put<BookDTO>(this.prefix + '/' + book.id, book);
  }

}
