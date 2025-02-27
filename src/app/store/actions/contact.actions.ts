import { createAction, props } from "@ngrx/store";
import { Contact } from "../../models/contact.model";

export const loadContacts = createAction("[Contact] Load Contacts");

export const loadContactsSuccess = createAction(
  "[Contact] Load Contacts Success",
  props<{ contacts: Contact[] }>()
);

export const loadContactsFailure = createAction(
  "[Contact] Load Contacts Failure",
  props<{ error: any }>()
);

// export const addContact = createAction(
//   "[Contact] Add Contact",
//   props<{ contact: Contact }>()
// );

// export const addContactSuccess = createAction(
//   "[Contact] Add Contact Success",
//   props<{ contact: Contact }>()
// );

// export const addContactFailure = createAction(
//   "[Contact] Add Contact Failure",
//   props<{ error: any }>()
// );

// export const updateContact = createAction(
//   "[Contact] Update Contact",
//   props<{ contact: Contact }>()
// );

// export const updateContactSuccess = createAction(
//   "[Contact] Update Contact Success",
//   props<{ contact: Contact }>()
// );

// export const updateContactFailure = createAction(
//   "[Contact] Update Contact Failure",
//   props<{ error: any }>()
// );

// export const deleteContact = createAction(
//   "[Contact] Delete Contact",
//   props<{ id: number | string }>()
// );

// export const deleteContactSuccess = createAction(
//   "[Contact] Delete Contact Success",
//   props<{ id: number | string }>()
// );

// export const deleteContactFailure = createAction(
//   "[Contact] Delete Contact Failure",
//   props<{ error: any }>()
// );

// export const ContactActions = {
//   loadContacts,
//   loadContactsSuccess,
//   loadContactsFailure,
//   addContact,
//   addContactSuccess,
//   addContactFailure,
//   updateContact,
//   updateContactSuccess,
//   updateContactFailure,
//   deleteContact,
//   deleteContactSuccess,
//   deleteContactFailure,
// };
