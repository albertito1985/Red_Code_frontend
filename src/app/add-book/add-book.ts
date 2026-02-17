import { Component } from '@angular/core';

@Component({
  selector: 'books/add-book',
  templateUrl: './add-book.html',
  styleUrl: './add-book.scss',
})
export class AddBook {
  onSubmit(event: Event, title: string, author: string): void {
    event.preventDefault();
    console.log('New book submitted:', { title, author });
  }
}
