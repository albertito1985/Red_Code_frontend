import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly storageKey = 'app_theme';
  private readonly darkTheme = 'dark';
  private readonly lightTheme = 'light';

  constructor() {
    this.applyTheme(this.getInitialTheme());
  }

  isDarkModeEnabled(): boolean {
    return this.getCurrentTheme() === this.darkTheme;
  }

  setDarkMode(isEnabled: boolean): void {
    const theme = isEnabled ? this.darkTheme : this.lightTheme;
    this.applyTheme(theme);
    localStorage.setItem(this.storageKey, theme);
  }

  private getInitialTheme(): string {
    const storedTheme = localStorage.getItem(this.storageKey);

    if (storedTheme === this.darkTheme || storedTheme === this.lightTheme) {
      return storedTheme;
    }

    const documentTheme = document.documentElement.getAttribute('data-bs-theme')
      ?? document.body.getAttribute('data-bs-theme');

    return documentTheme === this.darkTheme ? this.darkTheme : this.lightTheme;
  }

  private getCurrentTheme(): string {
    const documentTheme = document.documentElement.getAttribute('data-bs-theme')
      ?? document.body.getAttribute('data-bs-theme');

    if (documentTheme === this.darkTheme || documentTheme === this.lightTheme) {
      return documentTheme;
    }

    return this.lightTheme;
  }

  private applyTheme(theme: string): void {
    document.documentElement.setAttribute('data-bs-theme', theme);
    document.body.setAttribute('data-bs-theme', theme);
  }
}