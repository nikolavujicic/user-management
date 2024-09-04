import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from '@state/app.state';
import { selectCurrentUser } from '@state/selectors/user.selectors';
import * as UserActions from '@state/actions/user.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.store.select(selectCurrentUser).pipe(
      map(user => {
        if (user) {
          return true;
        } else {
          const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
          if (currentUser) {
            this.store.dispatch(UserActions.loginSuccess({ user: currentUser }));
            return true;
          } else {
            this.router.navigate(['/login']);
            return false;
          }
        }
      })
    );
  }
}
