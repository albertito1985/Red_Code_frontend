import { Component } from '@angular/core';

@Component({
  selector: 'books/add-book',
  templateUrl: './add-book.html',
  styleUrl: './add-book.scss',
})
export class AddBook {
  isModalOpen: boolean = false;

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  onSubmit(event: Event, titleInput: HTMLInputElement, authorInput: HTMLInputElement): void {
    event.preventDefault();
    const title = titleInput.value.trim();
    const author = authorInput.value.trim();

    if (!title || !author) {
      return;
    }

    console.log('New book submitted:', { title, author });
    titleInput.value = '';
    authorInput.value = '';
    this.closeModal();
  }
}
