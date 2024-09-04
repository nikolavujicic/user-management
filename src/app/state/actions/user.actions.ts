
import { createAction, props } from '@ngrx/store';
import { User } from '@models/user.model';

export const login = createAction('[Auth] Login', props<{ username: string; password: string }>());

export const loginSuccess = createAction('[Auth] Login Success', props<{ user: User }>());

export const loginFailure = createAction('[Auth] Login Failure', props<{ error: string }>());

export const loadUsers = createAction('[User] Load Users');

export const loadUsersSuccess = createAction('[User] Load Users Success', props<{ users: User[] }>());

export const loadUsersFailure = createAction('[User] Load Users Failure', props<{ error: string }>());

export const updateUser = createAction('[User] Update User', props<{ user: User }>());

export const updateUserSuccess = createAction('[User] Update User Success', props<{ user: User }>());

export const updateUserFailure = createAction('[User] Update User Failure', props<{ error: string }>());

export const autoLogin = createAction('[Auth] Auto Login');

export const logout = createAction('[Auth] Logout');