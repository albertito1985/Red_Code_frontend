import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'add-quote',
  imports: [FontAwesomeModule],
  templateUrl: './add-quote.html',
  styleUrl: './add-quote.scss',
})
export class AddQuote {
  isModalOpen: boolean = false;
  faPlus = faPlus;

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  onSubmit(event: Event, quoteInput: HTMLInputElement, authorInput: HTMLInputElement): void {
    event.preventDefault();
    const quotation = quoteInput.value.trim();
    const author = authorInput.value.trim();

    if (!quotation || !author) {
      return;
    }

    console.log('New quote submitted:', { quotation, author });
    quoteInput.value = '';
    authorInput.value = '';
    this.closeModal();
  }
}
