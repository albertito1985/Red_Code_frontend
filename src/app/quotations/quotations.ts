import { Component, OnInit } from '@angular/core';
import { QuoteForm } from '../quote-form/quote-form';
import { DatabaseService } from '../services/database.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

interface QuoteDto {
  id: number;
  quotation: string;
  author: string;
}

@Component({
  selector: 'app-quotations',
  templateUrl: './quotations.html',
  imports: [QuoteForm, FontAwesomeModule],
  styleUrl: './quotations.scss',
})
export class Quotations implements OnInit {
  quotesToDisplay: QuoteDto[] = [];
  faTrashCan = faTrashCan;
  
  constructor(private readonly databaseService: DatabaseService) {}

  ngOnInit() {
    this.loadQuotes();
  }

  loadQuotes(): void {
    this.databaseService.getAll<QuoteDto>('quotations').subscribe({
      next: (quotes) => {
        this.quotesToDisplay = quotes;
      },
      error: (error) => {
        console.error('Failed to load quotations', error);
      }
    });
  }

}
