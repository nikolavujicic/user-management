import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { User } from '@models/user.model';
import { Observable } from 'rxjs';
import { selectLoading } from '@state/selectors/user.selectors';
import { updateUser } from '@state/actions/user.actions';
import { AppState } from '@state/app.state';

@Component({
  selector: 'app-user-edit-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.scss'],
})
export class UserEditDialogComponent {
  userForm: FormGroup;
  loading$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    public dialogRef: MatDialogRef<UserEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User
  ) {
    this.userForm = this.fb.group({
      username: [user.username],
      role: [user.role]
    });
    this.loading$ = this.store.select(selectLoading); 
  }

  onSave() {
    const updatedUser = { ...this.user, ...this.userForm.value };
    this.store.dispatch(updateUser({ user: updatedUser }));
    this.dialogRef.close();
  }
}
