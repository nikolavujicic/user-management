import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { userReducer } from './app/state/reducers/user.reducer';
import { UserEffects } from './app/state/effects/user.effects';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    importProvidersFrom(
      StoreModule.forRoot({ userState: userReducer }),
      EffectsModule.forRoot([UserEffects]),
    ), provideAnimationsAsync(),

  ],
}).catch(err => console.error(err));
