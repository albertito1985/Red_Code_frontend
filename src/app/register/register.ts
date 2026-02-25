import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { AuthorizationService } from '../services/authorization.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterModule, RouterLinkActive, FontAwesomeModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register implements OnInit {
  name = '';
  email = '';
  password = '';
  isSubmitting = false;
  isFormSubmitted = false;
  registrationErrorMessage = '';
  isEnabled = false;
  minPasswordLength = 6;
  faCircleHalfStroke = faCircleHalfStroke;

  constructor(
    private readonly authorizationService: AuthorizationService,
    private readonly router: Router,
    private readonly themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.isEnabled = this.themeService.isDarkModeEnabled();
  }

  onSubmit(form: NgForm): void {
    this.isFormSubmitted = true;
    this.registrationErrorMessage = '';

    if (form.invalid || this.isSubmitting) {
      return;
    }

    const name = this.name.trim();
    const email = this.email.trim();
    const password = this.password.trim();

    if (!name || !email || !password) {
      return;
    }

    this.isSubmitting = true;

    this.authorizationService.register({ name, email, password }).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/books']);
      },
      error: (error) => {
        this.isSubmitting = false;
        this.registrationErrorMessage = 'Registration failed. Please check your details and try again.';
        console.error('Registration failed', error);
      }
    });
  }

  clearRegistrationError(): void {
    this.registrationErrorMessage = '';
  }

  onThemeSwitchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.isEnabled = input.checked;
    this.themeService.setDarkMode(this.isEnabled);
  }
}
