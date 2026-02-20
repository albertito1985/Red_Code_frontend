import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { Books } from './books';
import { BookService } from '../services/book.service';
import { QuoteService } from '../services/quote.service';

describe('Books', () => {
  let component: Books;
  let fixture: ComponentFixture<Books>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Books],
      providers: [
        provideRouter([]),
        {
          provide: BookService,
          useValue: {
            getBooks: () => of([]),
            deleteBook: () => of(void 0)
          }
        },
        {
          provide: QuoteService,
          useValue: {
            deleteQuote: () => of(void 0)
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Books);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
