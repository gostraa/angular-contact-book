import { contactReducer, initialState } from "./contact.reducer";
import {
  loadContactsSuccess,
  loadContactsFailure,
  deleteContactSuccess,
  deleteContactFailure,
  addContactSuccess,
  addContactFailure,
  updateContactSuccess,
  updateContactFailure,
} from "../actions/contact.actions";
const mockContact = {
  id: "1",
  firstName: "John",
  lastName: "Doe",
  phone: "1234567890",
  email: "john.doe@example.com",
};
const mockContacts = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    phone: "1234567890",
    email: "john.doe@example.com",
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    phone: "0987654321",
    email: "jane.smith@example.com",
  },
];

const initialContactsState = {
  ...initialState,
  contacts: [mockContact],
};
describe("contactReducer", () => {
  describe("loadContacts", () => {
    it("should update state with contacts on loadContactsSuccess", () => {
      const action = loadContactsSuccess({ contacts: mockContacts });
      const state = contactReducer(initialState, action);

      expect(state.contacts).toEqual(mockContacts);
      expect(state.error).toBeNull();
    });

    it("should update state with error on loadContactsFailure", () => {
      const error = "Failed to load contacts";
      const action = loadContactsFailure({ error });
      const state = contactReducer(initialState, action);

      expect(state.contacts).toEqual([]);
      expect(state.error).toBe(error);
    });
  });
  describe("deleteContact", () => {
    it("should update state with contacts after deleting a contact on deleteContactSuccess", () => {
      const action = deleteContactSuccess(mockContact);
      const state = contactReducer(initialContactsState, action);
      const stateAfterDeleting = state.contacts.filter(
        (c) => c.id !== mockContact.id
      );
      expect(state.contacts).toEqual(stateAfterDeleting);
      expect(state.error).toBeNull();
    });

    it("should update state with error on deleteContactFailure", () => {
      const error = "Failed to load contacts";
      const action = deleteContactFailure({ error });
      const state = contactReducer(initialContactsState, action);

      expect(state.contacts).toEqual([mockContact]);
      expect(state.error).toBe(error);
    });
  });

  describe("addContact", () => {
    it("should update state with contacts after adding a contact on addContactSuccess", () => {
      const action = addContactSuccess({ contact: mockContact });
      const state = contactReducer(initialState, action);
      expect(state.contacts).toEqual([mockContact]);
      expect(state.error).toBeNull();
    });

    it("should update state with error on addContactFailure", () => {
      const error = "Failed to load contacts";
      const action = addContactFailure({ error });
      const state = contactReducer(initialState, action);

      expect(state.contacts).toEqual([]);
      expect(state.error).toBe(error);
    });
  });

  describe("updateContact", () => {
    it("should update state with contacts after updating a contact on updateContactSuccess", () => {
      const action = updateContactSuccess({
        contact: {
          id: "1",
          firstName: "Mary",
          lastName: "Doe",
          phone: "1234567890",
          email: "john.doe@example.com",
        },
      });
      const state = contactReducer(initialContactsState, action);
      expect(state.contacts[0].firstName).toEqual("Mary");
      expect(state.contacts[0].lastName).toEqual("Doe");
      expect(state.contacts[0].phone).toEqual("1234567890");
      expect(state.contacts[0].email).toEqual("john.doe@example.com");
      expect(state.error).toBeNull();
    });

    it("should update state with error on updateContactFailure", () => {
      const error = "Failed to load contacts";
      const action = updateContactFailure({ error });
      const state = contactReducer(initialContactsState, action);

      expect(state.contacts).toEqual(initialContactsState.contacts);
      expect(state.contacts[0].firstName).toEqual("John");
      expect(state.contacts[0].lastName).toEqual("Doe");
      expect(state.contacts[0].phone).toEqual("1234567890");
      expect(state.contacts[0].email).toEqual("john.doe@example.com");
      expect(state.error).toBe(error);
    });
  });
});
