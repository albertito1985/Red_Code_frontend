import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { DatabaseService } from './database.service';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface AuthorizationResponseDto {
  token: string;
  refreshToken?: string;
  expiresAt?: string;
  userId?: number;
  name?: string;
  email?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private readonly loginResource = 'authorization/login';
  private readonly registerResource = 'authorization/register';
  private readonly tokenStorageKey = 'auth_token';
  private readonly refreshTokenStorageKey = 'auth_refresh_token';

  constructor(private readonly databaseService: DatabaseService) {}

  login(payload: LoginPayload): Observable<AuthorizationResponseDto> {
    return this.databaseService.create<AuthorizationResponseDto>(this.loginResource, payload).pipe(
      tap((response) => this.storeSession(response))
    );
  }

  register(payload: RegisterPayload): Observable<AuthorizationResponseDto> {
    return this.databaseService.create<AuthorizationResponseDto>(this.registerResource, payload).pipe(
      tap((response) => this.storeSession(response))
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenStorageKey);
    localStorage.removeItem(this.refreshTokenStorageKey);
  }

  isAuthenticated(): boolean {
    return Boolean(this.getToken());
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenStorageKey);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenStorageKey);
  }

  private storeSession(response: AuthorizationResponseDto): void {
    localStorage.setItem(this.tokenStorageKey, response.token);

    if (response.refreshToken) {
      localStorage.setItem(this.refreshTokenStorageKey, response.refreshToken);
    }
  }
}
