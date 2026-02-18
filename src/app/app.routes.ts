import { Routes } from '@angular/router';
import { Books } from './books/books';
import { Quotations} from './quotations/quotations';
import { LogIn} from './log-in/log-in';

export const routes: Routes = [
  { path: 'books', component: Books, title: 'Books' },
  { path: 'quotations', component: Quotations, title: 'Quotations' },
  { path: 'login', component: LogIn, title: 'Login' },
  { path: '', redirectTo: 'books', pathMatch: 'full' }
];