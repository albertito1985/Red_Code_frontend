import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBook, faQuoteLeft, faCircleHalfStroke, faEllipsisVertical} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-title-bar',
  imports: [RouterModule, RouterLinkActive, FontAwesomeModule],
  standalone:true,
  templateUrl: './title-bar.html',
  styleUrl: './title-bar.scss'
})
export class TitleBarComponent {
  isEnabled: boolean = false; // initial state
  isMenuOpen: boolean = false;
  faBook = faBook;
  faQuotes = faQuoteLeft;
  faCircleHalfStroke = faCircleHalfStroke;
  faEllipsisVertical = faEllipsisVertical;
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  setDarkMode(isDarkModeEnabled: boolean): void {
    this.isEnabled = isDarkModeEnabled;
    this.onToggle();
  }

  onThemeSwitchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.setDarkMode(input.checked);
  }

  onToggle() {
    console.log('Switch state:', this.isEnabled);
    if (this.isEnabled) {
      this.enableDarkMode();
    } else {
      this.disableDarkMode();
    }
  }

  enableDarkMode() {
    console.log('Dark mode enabled');
    document.body.setAttribute('data-bs-theme', 'dark');
  }

  disableDarkMode() {
    console.log('Dark mode disabled');
    document.body.setAttribute('data-bs-theme', 'light');
  }
}
