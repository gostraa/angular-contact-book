import { Action, createReducer, on } from "@ngrx/store";
import { Contact } from "../../models/contact.model";
import {
  loadContacts,
  loadContactsSuccess,
  loadContactsFailure,
} from "../actions/contact.actions";
export interface State {
  contacts: Contact[];
  loading: boolean;
  error: any;
}

export const initialState: State = {
  contacts: [],
  loading: false,
  error: null,
};

export const contactReducer = createReducer(
  initialState,
  on(loadContacts, (state) => ({
    ...state,
    loading: true,
  })),
  on(loadContactsSuccess, (state, { contacts }) => {
    return {
      ...state,
      contacts: contacts,
      loading: false,
    };
  }),
  on(loadContactsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
  // on(ContactActions.addContact, (state) => ({
  //   ...state,
  //   loading: true,
  // })),
  // on(ContactActions.addContactSuccess, (state, { contact }) => ({
  //   ...state,
  //   contacts: [...state.contacts, contact],
  //   loading: false,
  // })),
  // on(ContactActions.addContactFailure, (state, { error }) => ({
  //   ...state,
  //   error,
  //   loading: false,
  // })),
  // on(ContactActions.updateContact, (state) => ({
  //   ...state,
  //   loading: true,
  // })),
  // on(ContactActions.updateContactSuccess, (state, { contact }) => ({
  //   ...state,
  //   contacts: state.contacts.map((c) =>
  //     c.id === contact.id ? { ...c, ...contact } : c
  //   ),
  //   loading: false,
  // })),
  // on(ContactActions.updateContactFailure, (state, { error }) => ({
  //   ...state,
  //   error,
  //   loading: false,
  // })),
  // on(ContactActions.deleteContact, (state) => ({
  //   ...state,
  //   loading: true,
  // })),
  // on(ContactActions.deleteContactSuccess, (state, { id }) => ({
  //   ...state,
  //   contacts: state.contacts.filter((contact) => contact.id !== id),
  //   loading: false,
  // })),
  // on(ContactActions.deleteContactFailure, (state, { error }) => ({
  //   ...state,
  //   error,
  //   loading: false,
  // }))
);
