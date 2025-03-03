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
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { catchError, map, mergeMap, tap } from "rxjs/operators";

import {
  loadContacts,
  loadContactsFailure,
  loadContactsSuccess,
} from "../actions/contact.actions";
import { ContactService } from "../services/contact.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class ContactEffects {
  loadContacts$: Observable<Action>;
  addContact$: Observable<Action>;
  updateContact$: Observable<Action>;
  deleteContact$: Observable<Action>;

  constructor(
    private actions$: Actions,
    private contactService: ContactService,
    private snackBar: MatSnackBar
  ) {
    this.loadContacts$ = createEffect(() =>
      this.actions$.pipe(
        ofType(loadContacts),
        mergeMap(() =>
          this.contactService.getContacts().pipe(
            map((contacts) => loadContactsSuccess({ contacts })),
            catchError((error) =>
              of(loadContactsFailure({ error: error.message }))
            )
          )
        )
      )
    );

    this.addContact$ = createEffect(() =>
      this.actions$.pipe(
        ofType(addContact),
        mergeMap(({ contact }) => {
          return this.contactService.addContact(contact).pipe(
            map((contact) => addContactSuccess({ contact })),
            tap({
              next: () =>
                this.showSnackBar("Contact added successfully!", "Close"),
            }),
            catchError((error) => {
              return of(addContactFailure({ error: error.message }));
            })
          );
        })
      )
    );

    this.updateContact$ = createEffect(() =>
      this.actions$.pipe(
        ofType(updateContact),
        mergeMap(({ contact }) => {
          return this.contactService.updateContact(contact).pipe(
            map((contact) => updateContactSuccess({ contact })),
            tap({
              next: () =>
                this.showSnackBar("Contact updated successfully!", "Close"),
            }),
            catchError((error) =>
              of(updateContactFailure({ error: error.message }))
            )
          );
        })
      )
    );

    this.deleteContact$ = createEffect(() =>
      this.actions$.pipe(
        ofType(deleteContact),
        mergeMap((contact) => {
          return this.contactService.deleteContact(contact.id).pipe(
            map((id) => deleteContactSuccess(id)),
            tap({
              next: () =>
                this.showSnackBar("Contact deleted successfully!", "Close"),
            }),
            catchError((error) =>
              of(deleteContactFailure({ error: error.message }))
            )
          );
        })
      )
    );
  }

  private showSnackBar(
    message: string,
    action: string,
    type: "success" | "error" = "success"
  ) {
    this.snackBar.open(message, action, {
      duration: 4000,
      panelClass: type === "success" ? "snackbar-success" : "snackbar-error",
    });
  }
}
