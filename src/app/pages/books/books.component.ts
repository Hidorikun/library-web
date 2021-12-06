import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {BookDTO} from '../../shared/model/book-dto';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BookService} from '../../shared/services/book.service';
import {switchMap, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit, OnDestroy {

  books: BookDTO[];

  destroy$ = new Subject<boolean>();
  getBooks$ = this.bookService.getBooks().pipe(takeUntil(this.destroy$));

  constructor(
    private modalService: NgbModal,
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.getBooks$.subscribe(books => this.books = books);
  }

  addBook(modal: TemplateRef<any>) {
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title', }).result.then((book) => {
      this.bookService.addBook(book).pipe(
        switchMap( () => this.getBooks$)
      ).subscribe(books => this.books = books);
    }, (reason) => {
      console.log(reason);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
