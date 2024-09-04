
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State as UserState } from '../reducers/user.reducer';
import { AppState } from '@state/app.state';

export const selectUserState = createFeatureSelector<AppState, UserState>('userState');

export const selectUsers = createSelector(
  selectUserState,
  (state: UserState) => state.users
);

export const selectCurrentUser = createSelector(
  selectUserState,
  (state: UserState) => state.currentUser
);

export const selectLoading = createSelector(
  selectUserState,
  (state: UserState) => state.loading
);

export const selectError = createSelector(
  selectUserState,
  (state: UserState) => state.error
);
