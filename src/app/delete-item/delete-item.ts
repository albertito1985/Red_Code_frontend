import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { DatabaseService } from '../services/database.service';

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
  @Output() itemDeleted = new EventEmitter<void>();

  constructor(private readonly databaseService: DatabaseService) {}

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  onDelete(): void {
    this.databaseService.remove('quotations', this.itemId).subscribe({
      next: () => {
        this.itemDeleted.emit();
        this.closeModal();
      },
      error: (error) => {
        console.error('Failed to delete quote', error);
      }
    });
  }
}
