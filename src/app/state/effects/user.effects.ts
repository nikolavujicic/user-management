import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, Observable, throwError } from 'rxjs';
import { catchError, map, mergeMap, tap, delay } from 'rxjs/operators';
import * as UserActions from '@state/actions/user.actions';
import { User } from '@models/user.model';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {
    constructor(private actions$: Actions, private router: Router) {
        this.initializeLocalStorage();
    }

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.login),
            mergeMap((action) =>
                this.authenticate(action.username, action.password).pipe(
                    map((user: User) => UserActions.loginSuccess({ user })),
                    catchError((error) =>
                        of(UserActions.loginFailure({ error: error.message }))
                    )
                )
            )
        )
    );

    loginSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.loginSuccess),
            tap(({ user }) => {
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.router.navigate(['/users']);
            })
        ),
        { dispatch: false }
    );

    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.loadUsers),
            mergeMap(() =>
                this.fakeLoadUsers().pipe(
                    delay(1000),
                    map((users: User[]) => UserActions.loadUsersSuccess({ users })),
                    catchError((error) =>
                        of(UserActions.loadUsersFailure({ error: error.message }))
                    )
                )
            )
        )
    );

    autoLogin$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.autoLogin),
            map(() => {
                const user: User = JSON.parse(localStorage.getItem('currentUser') || 'null');
                if (user) {
                    return UserActions.loginSuccess({ user });
                } else {
                    return UserActions.logout();
                }
            })
        )
    );

    updateUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.updateUser),
            delay(1000),
            mergeMap(({ user }) => {
                const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
                const updatedUsers = users.map(u => u.id === user.id ? user : u);
                localStorage.setItem('users', JSON.stringify(updatedUsers));

                const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
                if (currentUser && currentUser.id === user.id) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return of(UserActions.updateUserSuccess({ user }));
            }),
            catchError((error) =>
                of(UserActions.updateUserFailure({ error: error.message }))
            )
        )
    );


    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.logout),
            tap(() => {
                localStorage.removeItem('currentUser');
                this.router.navigate(['/login']);
            })
        ),
        { dispatch: false }
    );

    private initializeLocalStorage() {
        const users: User[] = [
            { id: 1, username: 'admin', role: 'admin', password: 'admin' },
            { id: 2, username: 'user1', role: 'user', password: 'user1' },
            { id: 3, username: 'user2', role: 'user', password: 'user2' },
            { id: 4, username: 'user3', role: 'user', password: 'user3' },
            { id: 5, username: 'user4', role: 'user', password: 'user4' }
        ];
        if (!localStorage.getItem('users')) {
            localStorage.setItem('users', JSON.stringify(users));
        }
    }

    private authenticate(username: string, password: string): Observable<User> {
        const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find((u) => u.username === username && u.password === password);
        if (user) {
            return of(user);
        } else {
            return throwError(() => new Error('Invalid username or password')) as Observable<never>;
        }
    }

    private fakeLoadUsers(): Observable<User[]> {
        const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
        return of(users);
    }
}
