import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TitleBarComponent } from './title-bar/title-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TitleBarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('red-code-frontend');
}
