import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBook, faQuoteLeft, faCircleHalfStroke} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-title-bar',
  imports: [RouterModule, RouterLinkActive, FormsModule, FontAwesomeModule],
  standalone:true,
  templateUrl: './title-bar.html',
  styleUrl: './title-bar.scss'
})
export class TitleBarComponent {
  isEnabled: boolean = false; // initial state
  faBook = faBook;
  faQuotes = faQuoteLeft;
  faCircleHalfStroke = faCircleHalfStroke;
  onToggle() {
    console.log('Switch state:', this.isEnabled);
    if (this.isEnabled) {
      this.enableFeature();
    } else {
      this.disableFeature();
    }
  }

  enableFeature() {
    console.log('Feature enabled');
    // Add your custom logic here
  }

  disableFeature() {
    console.log('Feature disabled');
    // Add your custom logic here
  }
}
