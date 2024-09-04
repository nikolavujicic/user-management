import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '@models/user.model';
import { AppState } from '@state/app.state';
import { loadUsers, logout } from '@state/actions/user.actions';
import { selectUsers, selectCurrentUser, selectLoading } from '@state/selectors/user.selectors';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserEditDialogComponent } from '@components/user-edit-dialog/user-edit-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatProgressSpinnerModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]>;
  currentUser$: Observable<User | null>;
  loading$: Observable<boolean>;

  constructor(private store: Store<AppState>, private dialog: MatDialog) {
    this.users$ = this.store.select(selectUsers);
    this.currentUser$ = this.store.select(selectCurrentUser);
    this.loading$ = this.store.select(selectLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(loadUsers());
  }

  editUser(user: User) {
    const dialogRef = this.dialog.open(UserEditDialogComponent, {
      data: { ...user }
    });
  }

  logout() {
    this.store.dispatch(logout());
  }
}
