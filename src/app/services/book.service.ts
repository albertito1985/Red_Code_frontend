import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseService } from './database.service';

export interface BookDto {
  id: number;
  title: string;
  author: string;
}

export interface BookPayload {
  title: string;
  author: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private readonly booksResource = 'books';

  constructor(private readonly databaseService: DatabaseService) {}

  getBooks(): Observable<BookDto[]> {
    return this.databaseService.getAll<BookDto>(this.booksResource);
  }

  createBook(payload: BookPayload): Observable<BookDto> {
    return this.databaseService.create<BookDto>(this.booksResource, payload);
  }

  updateBook(id: number, payload: BookPayload): Observable<BookDto> {
    return this.databaseService.update<BookDto>(this.booksResource, id, payload);
  }

  deleteBook(id: number): Observable<void> {
    return this.databaseService.remove(this.booksResource, id);
  }

  deleteResource(resource: 'books' | 'quotations', id: number): Observable<void> {
    if (resource === this.booksResource) {
      return this.deleteBook(id);
    }

    return this.databaseService.remove(resource, id);
  }
}