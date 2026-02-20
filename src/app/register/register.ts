import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { AuthorizationService } from '../services/authorization.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterModule, RouterLinkActive],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  name = '';
  email = '';
  password = '';
  isSubmitting = false;

  constructor(
    private readonly authorizationService: AuthorizationService,
    private readonly router: Router
  ) {}

  onSubmit(): void {
    const name = this.name.trim();
    const email = this.email.trim();
    const password = this.password.trim();

    if (!name || !email || !password || this.isSubmitting) {
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
        console.error('Registration failed', error);
      }
    });
  }
}
