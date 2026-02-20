import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { Quotations } from './quotations';
import { QuoteService } from '../services/quote.service';
import { BookService } from '../services/book.service';

describe('Quotations', () => {
  let component: Quotations;
  let fixture: ComponentFixture<Quotations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Quotations],
      providers: [
        provideRouter([]),
        {
          provide: QuoteService,
          useValue: {
            getQuotes: () => of([]),
            createQuote: () => of({ id: 1, quotation: 'q', author: 'a' }),
            updateQuote: () => of({ id: 1, quotation: 'q', author: 'a' }),
            deleteQuote: () => of(void 0)
          }
        },
        {
          provide: BookService,
          useValue: {
            deleteBook: () => of(void 0)
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Quotations);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
