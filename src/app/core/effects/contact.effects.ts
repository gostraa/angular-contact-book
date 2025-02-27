import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ContactService } from "../services/contact.service";

import { switchMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";
import {
  loadContacts,
  loadContactsSuccess,
  loadContactsFailure,
} from "../../store/actions/contact.actions";

import { Contact } from "../../models/contact.model";

@Injectable()
export class ContactEffects {
  constructor(
    private readonly actions$: Actions,
    private contactService: ContactService
  ) {}
  loadContacts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadContacts),
      switchMap(() =>
        this.contactService.getContacts().pipe(
          map((contacts: Contact[]) => {
            return loadContactsSuccess({ contacts });
          }),
          catchError((error) => {
            return of(loadContactsFailure({ error }));
          })
        )
      )
    )
  );
}
