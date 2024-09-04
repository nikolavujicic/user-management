import { Routes } from '@angular/router';
import { LoginComponent } from '@components/login/login.component';
import { UserListComponent } from '@components/user-list/user-list.component';
import { AuthGuard } from '@guards/auth.guard';
import { LoginGuard } from '@guards/login.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'users', component: UserListComponent, canActivate: [AuthGuard] }
];
