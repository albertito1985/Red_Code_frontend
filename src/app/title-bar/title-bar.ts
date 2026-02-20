import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBook, faQuoteLeft, faCircleHalfStroke, faEllipsisVertical} from '@fortawesome/free-solid-svg-icons';
import { AuthorizationService } from '../services/authorization.service';

@Component({
  selector: 'app-title-bar',
  imports: [RouterModule, RouterLinkActive, FontAwesomeModule],
  standalone:true,
  templateUrl: './title-bar.html',
  styleUrl: './title-bar.scss'
})
export class TitleBarComponent implements OnInit {
  isEnabled: boolean = false;
  isMenuOpen: boolean = false;
  faBook = faBook;
  faQuotes = faQuoteLeft;
  faCircleHalfStroke = faCircleHalfStroke;
  faEllipsisVertical = faEllipsisVertical;

  constructor(private readonly authorizationService: AuthorizationService) {}

  ngOnInit(): void {
    const currentTheme = document.documentElement.getAttribute('data-bs-theme') ?? document.body.getAttribute('data-bs-theme');
    this.isEnabled = currentTheme === 'dark';
    this.applyTheme();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  setDarkMode(isDarkModeEnabled: boolean): void {
    this.isEnabled = isDarkModeEnabled;
    this.applyTheme();
  }

  onThemeSwitchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.setDarkMode(input.checked);
  }

  onLogout(event: Event): void {
    event.preventDefault();
    this.authorizationService.logoutAndRedirect();
  }

  private applyTheme(): void {
    if (this.isEnabled) {
      this.enableDarkMode();
    } else {
      this.disableDarkMode();
    }
  }

  private enableDarkMode(): void {
    document.documentElement.setAttribute('data-bs-theme', 'dark');
    document.body.setAttribute('data-bs-theme', 'dark');
  }

  private disableDarkMode(): void {
    document.documentElement.setAttribute('data-bs-theme', 'light');
    document.body.setAttribute('data-bs-theme', 'light');
  }
}
