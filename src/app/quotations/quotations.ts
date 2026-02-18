import { Component, OnInit } from '@angular/core';
import { QuoteForm } from '../quote-form/quote-form';
import { DeleteItem } from '../delete-item/delete-item';
import { DatabaseService } from '../services/database.service';

interface QuoteDto {
  id: number;
  quotation: string;
  author: string;
}

@Component({
  selector: 'app-quotations',
  templateUrl: './quotations.html',
  imports: [QuoteForm, DeleteItem],
  styleUrl: './quotations.scss',
})
export class Quotations implements OnInit {
  quotesToDisplay: QuoteDto[] = [];
  
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
