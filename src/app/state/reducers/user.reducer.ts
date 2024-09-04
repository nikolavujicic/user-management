import { createReducer, on } from '@ngrx/store';
import * as UserActions from '@state/actions/user.actions';
import { User } from '@models/user.model';

export interface State {
  users: User[];
  currentUser: User | null;
  loading: boolean;
  error: string | null;
}

export const initialState: State = {
  users: [],
  currentUser: null,
  loading: false,
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.login, (state) => ({ ...state, loading: true })),
  on(UserActions.loginSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    currentUser: user,
    error: null,
  })),
  on(UserActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(UserActions.loadUsers, (state) => ({ ...state, loading: true })),
  on(UserActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    loading: false,
    users,
  })),
  on(UserActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(UserActions.updateUser, (state) => ({ ...state, loading: true })),
  on(UserActions.updateUserSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    users: state.users.map((u) => (u.id === user.id ? user : u)),
    currentUser: state.currentUser?.id === user.id ? user : state.currentUser
  })),
  on(UserActions.updateUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(UserActions.logout, (state) => ({
    ...state,
    currentUser: null,
  })),
);
