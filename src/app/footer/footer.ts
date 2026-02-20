import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from '../services/authorization.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class FooterComponent {
  constructor(
    private readonly authorizationService: AuthorizationService,
    private readonly router: Router
  ) {}

  onLogout(event: Event): void {
    event.preventDefault();
    this.authorizationService.logout();
    this.router.navigate(['/login']);
  }
}
