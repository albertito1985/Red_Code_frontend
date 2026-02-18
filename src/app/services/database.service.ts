import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private readonly apiBaseUrl = this.buildBaseUrl();

  constructor(private readonly http: HttpClient) {}

  getAll<T>(resource: string): Observable<T[]> {
    return this.http.get<T[]>(this.resourceUrl(resource));
  }

  getById<T>(resource: string, id: string | number): Observable<T> {
    return this.http.get<T>(`${this.resourceUrl(resource)}/${id}`);
  }

  create<T>(resource: string, payload: Partial<T>): Observable<T> {
    return this.http.post<T>(this.resourceUrl(resource), payload);
  }

  update<T>(resource: string, id: string | number, payload: Partial<T>): Observable<T> {
    return this.http.put<T>(`${this.resourceUrl(resource)}/${id}`, payload);
  }

  remove(resource: string, id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.resourceUrl(resource)}/${id}`);
  }

  private resourceUrl(resource: string): string {
    return `${this.apiBaseUrl}/${resource}`;
  }

  private buildBaseUrl(): string {
    const { host, port} = environment.database;
    return `https://${host}:${port}/api`;
  }
}