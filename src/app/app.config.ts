import {
  ApplicationConfig,
  ModuleWithProviders,
  provideZoneChangeDetection,
} from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";

import { contactReducer } from "./store/redusers/contact.reducer";
import { provideEffects } from "@ngrx/effects";
import { ContactEffects } from "./core/effects/contact.effects";
import { provideHttpClient } from "@angular/common/http";
import { ContactService } from "./core/services/contact.service";
import { CommonModule } from "@angular/common";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideState, provideStore } from "@ngrx/store";

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(),
    provideState({
      name: "contacts",
      reducer: contactReducer,
    }),
    provideEffects(ContactEffects),
    provideHttpClient(),
    provideHttpClientTesting(),
  ],
};
