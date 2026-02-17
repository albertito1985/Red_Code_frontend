import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface BookDto {
  id: number;
  title: string;
  author: string;
}


@Component({
  selector: 'app-books',
  templateUrl: './books.html',
  imports: [RouterModule],
  styleUrl: './books.scss',
})
export class Books {

  booksToDisplay: BookDto[] = [];

  books: BookDto[] = [
    { id: 1, title: "To Kill a Mockingbird", author: "Harper Lee" },
    { id: 2, title: "1984", author: "George Orwell" },
    { id: 3, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { id: 4, title: "Pride and Prejudice", author: "Jane Austen" },
    { id: 5, title: "Moby-Dick", author: "Herman Melville" },
  ];

  ngOnInit() {
    this.booksToDisplay = this.books;
  }
  
}
