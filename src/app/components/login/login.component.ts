import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as UserActions from '@state/actions/user.actions';
import { AppState } from '@state/app.state';
import { Observable } from 'rxjs';
import { selectError } from '@state/selectors/user.selectors';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  error$: Observable<string | null>;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.loginForm = this.fb.group({
      username: [''],
      password: [''],
    });
    this.error$ = this.store.select(selectError); 
  }

  onSubmit() {
    const { username, password } = this.loginForm.value;
    this.store.dispatch(UserActions.login({ username, password }));
  }
}
