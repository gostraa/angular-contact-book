import { createReducer, on } from "@ngrx/store";
import {
  addContact,
  addContactFailure,
  addContactSuccess,
  deleteContact,
  loadContactsFailure,
  loadContactsSuccess,
  updateContact,
  updateContactFailure,
  updateContactSuccess,
} from "../actions/contact.actions";
import { Contact } from "../contact.model";

export interface ContactState {
  contacts: Contact[];
  error: string | null;
}

export const initialState: ContactState = {
  contacts: [],
  error: null,
};

export const contactReducer = createReducer(
  initialState,
  on(loadContactsSuccess, (state, { contacts }) => ({
    ...state,
    contacts,
  })),
  on(loadContactsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(deleteContact, (state, { id }) => ({
    ...state,
    contacts: state.contacts.filter((contact) => contact.id !== id),
  })),
  on(addContact, (state) => ({
    ...state,
    loading: true,
  })),
  on(addContactSuccess, (state, { contact }) => ({
    ...state,
    contacts: [...state.contacts, contact],
    loading: false,
  })),
  on(addContactFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(updateContact, (state) => ({
    ...state,
    loading: true,
  })),
  on(updateContactSuccess, (state, { contact }) => {
    console.log(contact, "contact");
    return {
      ...state,
      contacts: state.contacts.map((c) => {
        console.log(c, "c");
        return c.id === contact.id ? { ...c, ...contact } : c;
      }),
      loading: false,
    };
  }),
  on(updateContactFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
