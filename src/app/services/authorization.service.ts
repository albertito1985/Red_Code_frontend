import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
  private readonly loginResource = 'auth/login';
  private readonly registerResource = 'auth/register';
  private readonly tokenStorageKey = 'auth_token';
  private readonly refreshTokenStorageKey = 'auth_refresh_token';

  constructor(
    private readonly databaseService: DatabaseService,
    private readonly router: Router
  ) {}

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

  logoutAndRedirect(): void {
    this.logout();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();

    if (!token) {
      return false;
    }

    if (this.isTokenExpired(token)) {
      this.logout();
      return false;
    }

    return true;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenStorageKey);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenStorageKey);
  }

  private isTokenExpired(token: string): boolean {
    try {
      const [, payload] = token.split('.');

      if (!payload) {
        return true;
      }

      const decodedPayload = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
      const exp = decodedPayload?.exp;

      if (typeof exp !== 'number') {
        return true;
      }

      const nowInSeconds = Math.floor(Date.now() / 1000);
      return exp <= nowInSeconds;
    } catch {
      return true;
    }
  }

  private storeSession(response: AuthorizationResponseDto): void {
    localStorage.setItem(this.tokenStorageKey, response.token);

    if (response.refreshToken) {
      localStorage.setItem(this.refreshTokenStorageKey, response.refreshToken);
    }
  }
}
