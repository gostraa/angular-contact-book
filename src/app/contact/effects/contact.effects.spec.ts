import { TestBed } from "@angular/core/testing";
import { Action, StoreModule } from "@ngrx/store";
import { ContactEffects } from "./contact.effects";
import { ContactService } from "../services/contact.service";
import { provideMockActions } from "@ngrx/effects/testing";
import { hot, cold } from "jasmine-marbles";
import { Observable, of, throwError } from "rxjs";
import {
  addContact,
  addContactFailure,
  addContactSuccess,
  deleteContact,
  deleteContactFailure,
  deleteContactSuccess,
  loadContacts,
  loadContactsFailure,
  loadContactsSuccess,
  updateContact,
  updateContactFailure,
  updateContactSuccess,
} from "../actions/contact.actions";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient } from "@angular/common/http";
import { LogService } from "../services/log.service";

describe("ContactEffects", () => {
  let actions$: Observable<Action>;
  let effects: ContactEffects;
  let contactService: jasmine.SpyObj<ContactService>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;
  let http: HttpClient;
  let logService: jasmine.SpyObj<LogService>;

  const mockContacts = [
    {
      id: "some-id",
      firstName: "John",
      lastName: "Doe",
      phone: "1234567890",
      email: "john.doe@example.com",
    },
  ];

  const mockContact = {
    id: "some-id",
    firstName: "John",
    lastName: "Doe",
    phone: "1234567890",
    email: "john.doe@example.com",
  };

  beforeEach(() => {
    contactService = jasmine.createSpyObj("ContactService", [
      "getContacts",
      "addContact",
      "updateContact",
      "deleteContact",
    ]);
    snackBar = jasmine.createSpyObj("MatSnackBar", ["open"]);
    const logServiceSpy = jasmine.createSpyObj("LogService", [
      "logErrorToServer",
      "logErrorToConsole",
    ]);
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        ContactEffects,
        provideMockActions(() => actions$),
        { provide: ContactService, useValue: contactService },
        { provide: MatSnackBar, useValue: snackBar },
        { provide: LogService, useValue: logServiceSpy },
      ],
    });

    logService = TestBed.inject(LogService) as jasmine.SpyObj<LogService>;
    effects = TestBed.inject(ContactEffects);
  });

  describe("loadContacts$", () => {
    it("should load contacts successfully", () => {
      const action = loadContacts();
      const completion = loadContactsSuccess({ contacts: mockContacts });

      actions$ = hot("-a-", { a: action });
      contactService.getContacts.and.returnValue(of(mockContacts));

      const expected = cold("-b", { b: completion });

      expect(effects.loadContacts$).toBeObservable(expected);
    });

    it("should handle error when loading contacts", () => {
      const action = loadContacts();
      const error = { message: "Failed to load contacts" };
      const completion = loadContactsFailure({ error: error.message });
      logService.logErrorToServer.and.returnValue(
        of({ message: "Log received successfully" })
      );
      logService.logErrorToConsole.and.stub();
      actions$ = hot("-a-", { a: action });
      contactService.getContacts.and.returnValue(throwError(() => error));

      const expected = cold("-b", { b: completion });

      expect(effects.loadContacts$).toBeObservable(expected);
      expect(logService.logErrorToServer).toHaveBeenCalledWith({ error });
      expect(logService.logErrorToConsole).toHaveBeenCalledWith(
        "Failed to load contacts",
        error
      );
    });
  });

  describe("addContact$", () => {
    it("should add contact successfully", () => {
      const action = addContact({ contact: mockContact });
      const completion = addContactSuccess({ contact: mockContact });

      actions$ = hot("-a-", { a: action });
      contactService.addContact.and.returnValue(of(mockContact));

      const expected = cold("-b", { b: completion });

      expect(effects.addContact$).toBeObservable(expected);
      expect(snackBar.open).toHaveBeenCalledWith(
        "Contact added successfully!",
        "Close",
        { duration: 4000, panelClass: "snackbar-success" }
      );
    });

    it("should handle error when adding contact", () => {
      const action = addContact({ contact: mockContact });

      const error = { message: "Failed to add contact" };
      const completion = addContactFailure({ error: error.message });
      logService.logErrorToServer.and.returnValue(
        of({ message: "Log received successfully" })
      );
      logService.logErrorToConsole.and.stub();
      actions$ = hot("-a-", { a: action });
      contactService.addContact.and.returnValue(throwError(() => error));

      const expected = cold("-b", { b: completion });

      expect(effects.addContact$).toBeObservable(expected);
      expect(logService.logErrorToServer).toHaveBeenCalledWith({ error });
      expect(logService.logErrorToConsole).toHaveBeenCalledWith(
        "Failed to add contact",
        error
      );
    });
  });

  describe("updateContact$", () => {
    it("should update contact successfully", () => {
      const action = updateContact({ contact: mockContact });
      const completion = updateContactSuccess({ contact: mockContact });

      actions$ = hot("-a-", { a: action });
      contactService.updateContact.and.returnValue(of(mockContact));

      const expected = cold("-b", { b: completion });

      expect(effects.updateContact$).toBeObservable(expected);
      expect(snackBar.open).toHaveBeenCalledWith(
        "Contact updated successfully!",
        "Close",
        { duration: 4000, panelClass: "snackbar-success" }
      );
    });

    it("should handle error when updating contact", () => {
      const action = updateContact({ contact: mockContact });

      const error = { message: "Failed to update contact" };
      const completion = updateContactFailure({ error: error.message });
      logService.logErrorToServer.and.returnValue(
        of({ message: "Log received successfully" })
      );
      logService.logErrorToConsole.and.stub();

      actions$ = hot("-a-", { a: action });
      contactService.updateContact.and.returnValue(throwError(() => error));

      const expected = cold("-b", { b: completion });

      expect(effects.updateContact$).toBeObservable(expected);
      expect(logService.logErrorToServer).toHaveBeenCalledWith({ error });
      expect(logService.logErrorToConsole).toHaveBeenCalledWith(
        "Failed to update contact",
        error
      );
    });
  });

  describe("deleteContact$", () => {
    it("should delete contact successfully", () => {
      const action = deleteContact({ id: mockContact.id });
      const completion = deleteContactSuccess({ id: mockContact.id });

      actions$ = hot("-a-", { a: action });
      contactService.deleteContact.and.returnValue(of({ id: mockContact.id }));

      const expected = cold("-b", { b: completion });

      expect(effects.deleteContact$).toBeObservable(expected);
      expect(snackBar.open).toHaveBeenCalledWith(
        "Contact deleted successfully!",
        "Close",
        { duration: 4000, panelClass: "snackbar-success" }
      );
    });

    it("should handle error when deleting contacts", () => {
      const action = deleteContact({ id: mockContact.id });
      const error = { message: "Failed to delete contact" };
      const completion = deleteContactFailure({ error: error.message });
      logService.logErrorToServer.and.returnValue(
        of({ message: "Log received successfully" })
      );
      logService.logErrorToConsole.and.stub();
      actions$ = hot("-a-", { a: action });
      contactService.deleteContact.and.returnValue(throwError(() => error));

      const expected = cold("-b", { b: completion });

      expect(effects.deleteContact$).toBeObservable(expected);
      expect(logService.logErrorToServer).toHaveBeenCalledWith({ error });
      expect(logService.logErrorToConsole).toHaveBeenCalledWith(
        "Failed to delete contact",
        error
      );
    });
  });
});
