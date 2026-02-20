import { Component, OnInit } from '@angular/core';
import { QuoteForm } from '../quote-form/quote-form';
import { DeleteItem } from '../delete-item/delete-item';
import { CardComponent } from '../card/card';
import { QuoteDto, QuoteService } from '../services/quote.service';

@Component({
  selector: 'app-quotations',
  templateUrl: './quotations.html',
  imports: [QuoteForm, DeleteItem, CardComponent],
  styleUrl: './quotations.scss',
})
export class Quotations implements OnInit {
  quotesToDisplay: QuoteDto[] = [];
  
  constructor(private readonly quoteService: QuoteService) {}

  ngOnInit() {
    this.loadQuotes();
  }

  loadQuotes(): void {
    this.quoteService.getQuotes().subscribe({
      next: (quotes) => {
        this.quotesToDisplay = [...quotes].reverse();
      },
      error: (error) => {
        console.error('Failed to load quotations', error);
      }
    });
  }

}
