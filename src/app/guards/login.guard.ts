// src/app/login.guard.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from '@state/app.state';
import { selectCurrentUser } from '@state/selectors/user.selectors';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard {
  constructor(private store: Store<AppState>, private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.store.select(selectCurrentUser).pipe(
      map(user => {
        if (user) {
          this.router.navigate(['/users']);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
