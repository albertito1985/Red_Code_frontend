import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BookForm } from '../book-form/book-form';
import { DeleteItem } from '../delete-item/delete-item';
import { CardComponent } from '../card/card';
import { BookDto, BookService } from '../services/book.service';


@Component({
  selector: 'app-books',
  templateUrl: './books.html',
  imports: [RouterModule, BookForm, DeleteItem, CardComponent],
  styleUrl: './books.scss',
})
export class Books implements OnInit {

  booksToDisplay: BookDto[] = [];
  activeCardId: number | null = null;
  activeActionRowId: number | null = null;

  constructor(private readonly bookService: BookService) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (books) => {
        this.booksToDisplay = [...books].reverse();
      },
      error: (error) => {
        console.error('Failed to load books', error);
      }
    });
  }

  onCardTapped(itemId: number): void {
    this.activeCardId = this.activeCardId === itemId ? null : itemId;
  }

  onActionRowToggle(itemId: number): void {
    this.activeActionRowId = this.activeActionRowId === itemId ? null : itemId;
  }

  onActionRowLeave(): void {
    this.activeActionRowId = null;
  }

  isActionVisible(itemId: number): boolean {
    return this.activeActionRowId === itemId;
  }
  
}
