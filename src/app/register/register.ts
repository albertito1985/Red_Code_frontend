import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [RouterModule, RouterLinkActive],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {}
