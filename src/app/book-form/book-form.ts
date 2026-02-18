import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons';
import { DatabaseService } from '../services/database.service';

interface BookFormInput {
  id: number;
  title: string;
  author: string;
}

@Component({
  selector: 'book-form',
  imports: [FontAwesomeModule, FormsModule],
  templateUrl: './book-form.html',
  styleUrl: './book-form.scss',
})
export class BookForm {
  isModalOpen: boolean = false;
  faPlus = faPlus;
  faPenToSquare = faPenToSquare;
  title = '';
  author = '';

  @Input() bookToEdit: BookFormInput | null = null;
  @Output() bookSaved = new EventEmitter<void>();

  constructor(private readonly databaseService: DatabaseService) {}

  openModal(): void {
    if (this.isEditMode && this.bookToEdit) {
      this.title = this.bookToEdit.title;
      this.author = this.bookToEdit.author;
    } else {
      this.title = '';
      this.author = '';
    }

    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  get isEditMode(): boolean {
    return this.bookToEdit !== null;
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    const title = this.title.trim();
    const author = this.author.trim();

    if (!title || !author) {
      return;
    }

    if (this.isEditMode && this.bookToEdit) {
      this.databaseService.update('books', this.bookToEdit.id, { title, author }).subscribe({
        next: (updatedBook) => {
          console.log('Book updated:', updatedBook);
          this.bookSaved.emit();
          this.closeModal();
        },
        error: (error) => {
          console.error('Failed to update book', error);
        }
      });
    } else {
      this.databaseService.create('books', { title, author }).subscribe({
        next: (newBook) => {
          console.log('New book submitted:', newBook);
          this.bookSaved.emit();
          this.title = '';
          this.author = '';
          this.closeModal();
        },
        error: (error) => {
          console.error('Failed to submit book', error);
        }
      });
    }
  }
}
