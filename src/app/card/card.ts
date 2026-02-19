import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookForm } from '../book-form/book-form';
import { DeleteItem } from '../delete-item/delete-item';
import { QuoteForm } from '../quote-form/quote-form';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBook, faQuoteLeft, faQuoteRight} from '@fortawesome/free-solid-svg-icons';


interface BookCardItem {
  id: number;
  title: string;
  author: string;
}

interface QuoteCardItem {
  id: number;
  quotation: string;
  author: string;
}

@Component({
  selector: 'app-card',
  imports: [BookForm, QuoteForm, DeleteItem, FontAwesomeModule],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class CardComponent {
  @Input({ required: true }) index!: number;
  @Input({ required: true }) item!: BookCardItem | QuoteCardItem;

  @Output() itemSaved = new EventEmitter<void>();
  @Output() itemDeleted = new EventEmitter<void>();

    faBook = faBook;
    faQuoteLeft = faQuoteLeft;
    faQuoteRight = faQuoteRight;
    
  isBook(item: BookCardItem | QuoteCardItem): item is BookCardItem {
    return 'title' in item;
  }
}
