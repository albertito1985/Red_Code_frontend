import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { AuthorizationService } from '../services/authorization.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleHalfStroke} from '@fortawesome/free-solid-svg-icons';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-log-in',
  imports: [FormsModule, RouterModule, RouterLinkActive, FontAwesomeModule],
  templateUrl: './log-in.html',
  styleUrl: './log-in.scss',
})
export class LogIn implements OnInit {
  email = '';
  password = '';
  isSubmitting = false;
  isEnabled = false;
  faCircleHalfStroke = faCircleHalfStroke;

  constructor(
    private readonly authorizationService: AuthorizationService,
    private readonly router: Router,
    private readonly themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.isEnabled = this.themeService.isDarkModeEnabled();
  }

  onSubmit(): void {
    const email = this.email.trim();
    const password = this.password.trim();

    if (!email || !password || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;

    this.authorizationService.login({ email, password }).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/books']);
      },
      error: (error) => {
        this.isSubmitting = false;
        console.error('Login failed', error);
      }
    });
  }

  onThemeSwitchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.isEnabled = input.checked;
    this.themeService.setDarkMode(this.isEnabled);
  }

}
