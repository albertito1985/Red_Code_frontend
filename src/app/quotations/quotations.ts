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
  activeCardId: number | null = null;
  activeActionRowId: number | null = null;
  
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

  onCardTapped(itemId: number): void {
    this.activeCardId = this.activeCardId === itemId ? null : itemId;
  }

  onActionRowToggle(itemId: number): void {
    this.activeActionRowId = this.activeActionRowId === itemId ? null : itemId;
  }

  onActionRowLeave(): void {
    this.activeActionRowId = null;
  }

  isActionVisible(itemId: number): boolean {
    return this.activeActionRowId === itemId;
  }

}
