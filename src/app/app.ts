import { Component, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { TitleBarComponent } from './title-bar/title-bar';
import { filter, startWith } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TitleBarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('red-code-frontend');
  protected readonly currentPage = signal('Books');

  protected isAuthPage(): boolean {
    return this.currentPage() === 'Login' || this.currentPage() === 'Register';
  }

  constructor(private readonly router: Router, private readonly activatedRoute: ActivatedRoute) {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        startWith(null)
      )
      .subscribe(() => {
        this.currentPage.set(this.getRouteTitle());
      });
  }

  private getRouteTitle(): string {
    let currentRoute = this.activatedRoute;

    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    }

    return (currentRoute.snapshot.title as string) || 'Books';
  }
}
