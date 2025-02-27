import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "../../store/redusers/contact.reducer";

export const selectContactsState = createFeatureSelector<State>("contacts");

export const selectAllContacts = createSelector(
  selectContactsState,
  (state: State) => state.contacts
);
