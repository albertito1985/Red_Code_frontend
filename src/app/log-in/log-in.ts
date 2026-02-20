import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { AuthorizationService } from '../services/authorization.service';

@Component({
  selector: 'app-log-in',
  imports: [FormsModule, RouterModule, RouterLinkActive],
  templateUrl: './log-in.html',
  styleUrl: './log-in.scss',
})
export class LogIn {
  email = '';
  password = '';
  isSubmitting = false;

  constructor(
    private readonly authorizationService: AuthorizationService,
    private readonly router: Router
  ) {}

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

}
