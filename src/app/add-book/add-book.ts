import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'books/add-book',
  imports: [FontAwesomeModule],
  templateUrl: './add-book.html',
  styleUrl: './add-book.scss',
})
export class AddBook {
  isModalOpen: boolean = false;
  faPlus = faPlus;

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
