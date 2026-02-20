import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons';
import { QuoteService } from '../services/quote.service';

interface QuoteFormInput {
  id: number;
  quotation: string;
  author: string;
}

@Component({
  selector: 'quote-form',
  imports: [FontAwesomeModule, FormsModule],
  templateUrl: './quote-form.html',
  styleUrl: './quote-form.scss',
})
export class QuoteForm {
  isModalOpen: boolean = false;
  faPlus = faPlus;
  faPenToSquare = faPenToSquare;
  quotation = '';
  author = '';

  @Input() quoteToEdit: QuoteFormInput | null = null;
  @Output() quoteSaved = new EventEmitter<void>();

  constructor(private readonly quoteService: QuoteService) {}

  openModal(): void {
    if (this.isEditMode && this.quoteToEdit) {
      this.quotation = this.quoteToEdit.quotation;
      this.author = this.quoteToEdit.author;
    } else {
      this.quotation = '';
      this.author = '';
    }

    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  get isEditMode(): boolean {
    return this.quoteToEdit !== null;
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    const quotation = this.quotation.trim();
    const author = this.author.trim();

    if (!quotation || !author) {
      return;
    }

    if (this.isEditMode && this.quoteToEdit) {
      this.quoteService.updateQuote(this.quoteToEdit.id, { quotation, author }).subscribe({
        next: (updatedQuote) => {
          console.log('Quote updated:', updatedQuote);
          this.quoteSaved.emit();
          this.closeModal();
        },
        error: (error) => {
          console.error('Failed to update quote', error);
        }
      });
    } else {
      this.quoteService.createQuote({ quotation, author }).subscribe({
        next: (newQuote) => {
          console.log('New quote submitted:', newQuote);
          this.quoteSaved.emit();
          this.quotation = '';
          this.author = '';
          this.closeModal();
        },
        error: (error) => {
          console.error('Failed to submit quote', error);
        }
      });
    }
  }
}
