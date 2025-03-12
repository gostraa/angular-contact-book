import { createReducer, on } from "@ngrx/store";
import {
  addContactFailure,
  addContactSuccess,
  deleteContactFailure,
  deleteContactSuccess,
  loadContactsFailure,
  loadContactsSuccess,
  updateContactFailure,
  updateContactSuccess,
} from "../actions/contact.actions";
import { Contact } from "../contact.model";

export interface ContactState {
  contacts: Contact[];
  error: string | null;
  loaded: boolean;
}

export const initialState: ContactState = {
  contacts: [],
  error: null,
  loaded: false,
};

export const contactReducer = createReducer(
  initialState,
  on(loadContactsSuccess, (state, { contacts }) => ({
    ...state,
    contacts,
    loaded: true,
  })),
  on(loadContactsFailure, (state, { error }) => ({
    ...state,
    error,
    loaded: false,
  })),
  on(deleteContactSuccess, (state, { id }) => ({
    ...state,
    contacts: state.contacts.filter((contact) => contact.id !== id),
  })),
  on(deleteContactFailure, (state, { error }) => {
    return {
      ...state,
      error: error,
    };
  }),
  on(addContactSuccess, (state, { contact }) => ({
    ...state,
    contacts: [...state.contacts, contact],
  })),
  on(addContactFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(updateContactSuccess, (state, { contact }) => {
    return {
      ...state,
      contacts: state.contacts.map((c) => {
        return c.id === contact.id ? { ...c, ...contact } : c;
      }),
    };
  }),
  on(updateContactFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
