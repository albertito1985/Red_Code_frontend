import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { BookService } from '../services/book.service';

@Component({
  selector: 'delete-item',
  imports: [FontAwesomeModule],
  templateUrl: './delete-item.html',
  styleUrl: './delete-item.scss',
})
export class DeleteItem {
  isModalOpen: boolean = false;
  faTrashCan = faTrashCan;

  @Input({ required: true }) itemId!: number;
  @Input({ required: true }) resource!: 'books' | 'quotations';
  @Output() itemDeleted = new EventEmitter<void>();

  constructor(private readonly bookService: BookService) {}

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  onDelete(): void {
    this.bookService.deleteResource(this.resource, this.itemId).subscribe({
      next: () => {
        this.itemDeleted.emit();
        this.closeModal();
      },
      error: (error) => {
        console.error(`Failed to delete item from ${this.resource}`, error);
      }
    });
  }
}
