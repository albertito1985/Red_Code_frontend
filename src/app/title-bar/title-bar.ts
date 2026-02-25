import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBook, faQuoteLeft, faCircleHalfStroke, faEllipsisVertical} from '@fortawesome/free-solid-svg-icons';
import { AuthorizationService } from '../services/authorization.service';
import { ThemeService } from '../services/theme.service';

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

  constructor(
    private readonly authorizationService: AuthorizationService,
    private readonly themeService: ThemeService,
    private readonly elementRef: ElementRef<HTMLElement>
  ) {}

  ngOnInit(): void {
    this.isEnabled = this.themeService.isDarkModeEnabled();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  @HostListener('document:touchstart', ['$event'])
  onDocumentInteraction(event: Event): void {
    if (!this.isMenuOpen) {
      return;
    }

    const target = event.target as Node | null;
    const isClickInside = target ? this.elementRef.nativeElement.contains(target) : false;

    if (!isClickInside) {
      this.isMenuOpen = false;
    }
  }

  setDarkMode(isDarkModeEnabled: boolean): void {
    this.isEnabled = isDarkModeEnabled;
    this.themeService.setDarkMode(this.isEnabled);
  }

  onThemeSwitchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.setDarkMode(input.checked);
  }

  onLogout(event: Event): void {
    event.preventDefault();
    this.authorizationService.logoutAndRedirect();
  }
}
