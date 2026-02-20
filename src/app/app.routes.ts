import { Routes } from '@angular/router';
import { Books } from './books/books';
import { Quotations} from './quotations/quotations';
import { LogIn} from './log-in/log-in';
import { Register } from './register/register';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'books', component: Books, title: 'Books', canActivate: [authGuard] },
  { path: 'quotations', component: Quotations, title: 'Quotations', canActivate: [authGuard] },
  { path: 'login', component: LogIn, title: 'Login' },
  { path: 'register', component: Register, title: 'Register' },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];