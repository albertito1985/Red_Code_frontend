import { Component } from '@angular/core';
import { AddQuote } from '../add-quote/add-quote';

interface QuoteDto {
  id: number;
  quotation: string;
  author: string;
}

@Component({
  selector: 'app-quotations',
  templateUrl: './quotations.html',
  imports: [AddQuote],
  styleUrl: './quotations.scss',
})
export class Quotations {
  quotesToDisplay: QuoteDto[] = [];

  quotes: QuoteDto[] = [
    { id: 1, quotation: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { id: 2, quotation: "Success is not the key to happiness. Happiness is the key to success.", author: "Albert Schweitzer" },
    { id: 3, quotation: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { id: 4, quotation: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { id: 5, quotation: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" }
  ];

  ngOnInit() {
    this.quotesToDisplay = this.quotes;
  }

}
