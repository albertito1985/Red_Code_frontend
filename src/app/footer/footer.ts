import { Component } from '@angular/core';
import { AuthorizationService } from '../services/authorization.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class FooterComponent {
  constructor(private readonly authorizationService: AuthorizationService) {}

  onLogout(event: Event): void {
    event.preventDefault();
    this.authorizationService.logoutAndRedirect();
  }
}
