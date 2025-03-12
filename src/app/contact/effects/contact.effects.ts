import {
  addContact,
  addContactFailure,
  addContactSuccess,
  deleteContact,
  deleteContactFailure,
  deleteContactSuccess,
  updateContact,
  updateContactFailure,
  updateContactSuccess,
} from "./../actions/contact.actions";
import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap, tap } from "rxjs/operators";

import {
  loadContacts,
  loadContactsFailure,
  loadContactsSuccess,
} from "../actions/contact.actions";
import { ContactService } from "../services/contact.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { LogService } from "../services/log.service";

@Injectable()
export class ContactEffects {
  private actions$ = inject(Actions);
  private contactService = inject(ContactService);
  private snackBar = inject(MatSnackBar);
  private logService = inject(LogService);

  loadContacts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadContacts),
      mergeMap(() =>
        this.contactService.getContacts().pipe(
          map((contacts) => loadContactsSuccess({ contacts })),
          catchError((error) => {
            this.logService.logErrorToConsole("Failed to load contacts", error);
            return this.logService
              .logErrorToServer({ error })
              .pipe(map(() => loadContactsFailure({ error: error.message })));
          })
        )
      )
    )
  );

  addContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addContact),
      mergeMap(({ contact }) => {
        return this.contactService.addContact(contact).pipe(
          map((contact) => addContactSuccess({ contact })),
          tap(() => this.showSnackBar("Contact added successfully!", "Close")),
          catchError((error) => {
            this.logService.logErrorToConsole("Failed to add contact", error);
            return this.logService
              .logErrorToServer({ error })
              .pipe(map(() => addContactFailure({ error: error.message })));
          })
        );
      })
    )
  );

  updateContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateContact),
      mergeMap(({ contact }) => {
        return this.contactService.updateContact(contact).pipe(
          map((contact) => updateContactSuccess({ contact })),
          tap(() =>
            this.showSnackBar("Contact updated successfully!", "Close")
          ),
          catchError((error) => {
            this.logService.logErrorToConsole(
              "Failed to update contact",
              error
            );
            return this.logService
              .logErrorToServer({ error })
              .pipe(map(() => updateContactFailure({ error: error.message })));
          })
        );
      })
    )
  );

  deleteContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteContact),
      mergeMap(({ id }) => {
        return this.contactService.deleteContact(id).pipe(
          map(() => deleteContactSuccess({ id })),
          tap(() =>
            this.showSnackBar("Contact deleted successfully!", "Close")
          ),
          catchError((error) => {
            this.logService.logErrorToConsole(
              "Failed to delete contact",
              error
            );
            return this.logService
              .logErrorToServer({ error })
              .pipe(map(() => deleteContactFailure({ error: error.message })));
          })
        );
      })
    )
  );

  private showSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
      panelClass: "snackbar-success",
    });
  }
}
