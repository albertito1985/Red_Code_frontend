import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseService } from './database.service';

export interface QuoteDto {
  id: number;
  quotation: string;
  author: string;
}

export interface QuotePayload {
  quotation: string;
  author: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  private readonly quotationsResource = 'quotations';

  constructor(private readonly databaseService: DatabaseService) {}

  getQuotes(): Observable<QuoteDto[]> {
    return this.databaseService.getAll<QuoteDto>(this.quotationsResource);
  }

  createQuote(payload: QuotePayload): Observable<QuoteDto> {
    return this.databaseService.create<QuoteDto>(this.quotationsResource, payload);
  }

  updateQuote(id: number, payload: QuotePayload): Observable<QuoteDto> {
    return this.databaseService.update<QuoteDto>(this.quotationsResource, id, payload);
  }

  deleteQuote(id: number): Observable<void> {
    return this.databaseService.remove(this.quotationsResource, id);
  }
}
