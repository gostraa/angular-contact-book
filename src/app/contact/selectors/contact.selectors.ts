import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ContactState } from "../reducers/contact.reducer";

export const selectContactState =
  createFeatureSelector<ContactState>("contacts");

export const selectAllContacts = createSelector(
  selectContactState,
  (state) => state.contacts
);

export const selectError = createSelector(
  selectContactState,
  (state) => state.error
);
