import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { contactReducer } from "./contact/reducers/contact.reducer";
import { provideStore } from "@ngrx/store";
import { ContactEffects } from "./contact/effects/contact.effects";
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { provideEffects } from "@ngrx/effects";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { ErrorInterceptor } from "./contact/interceptors/error.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideStore({ contacts: contactReducer }),
    provideEffects(ContactEffects),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
};
