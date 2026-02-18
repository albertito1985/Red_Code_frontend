import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BookForm } from '../book-form/book-form';
import { DeleteItem } from '../delete-item/delete-item';
import { DatabaseService } from '../services/database.service';

interface BookDto {
  id: number;
  title: string;
  author: string;
}


@Component({
  selector: 'app-books',
  templateUrl: './books.html',
  imports: [RouterModule, BookForm, DeleteItem],
  styleUrl: './books.scss',
})
export class Books implements OnInit {

  booksToDisplay: BookDto[] = [];

  constructor(private readonly databaseService: DatabaseService) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks(): void {
    this.databaseService.getAll<BookDto>('books').subscribe({
      next: (books) => {
        this.booksToDisplay = books;
      },
      error: (error) => {
        console.error('Failed to load books', error);
      }
    });
  }
  
}
