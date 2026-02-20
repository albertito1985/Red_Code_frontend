import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { AuthorizationService } from '../services/authorization.service';

import { LogIn } from './log-in';

describe('LogIn', () => {
  let component: LogIn;
  let fixture: ComponentFixture<LogIn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogIn],
      providers: [
        provideRouter([]),
        {
          provide: AuthorizationService,
          useValue: {
            login: () => of({ token: 'token' })
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogIn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
