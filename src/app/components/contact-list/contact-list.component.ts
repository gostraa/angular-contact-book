import { Component, inject, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { Contact } from "../../models/contact.model";

import { map, startWith } from "rxjs/operators";
import { combineLatest } from "rxjs";
import { selectAllContacts } from "../../core/selectors/contact.selectors";
import { loadContacts } from "../../store/actions/contact.actions";
import { CommonModule } from "@angular/common";
import { EffectsModule } from "@ngrx/effects";
import { contactReducer } from "../../store/redusers/contact.reducer";

@Component({
  selector: "app-contact-list",
  templateUrl: "./contact-list.component.html",
  styleUrls: ["./contact-list.component.scss"],
  imports: [CommonModule, EffectsModule],
})
export class ContactListComponent implements OnInit {
  private store = inject(Store);

  searchText = "";
  sortAscending = true;

  contacts$: Observable<Contact[]> = this.store.pipe(select(selectAllContacts));

  filteredContacts$: Observable<Contact[]> = combineLatest([
    this.contacts$,
    this.store.pipe(select(() => this.searchText)).pipe(startWith("")),
  ]).pipe(
    map(([contacts, searchText]) => {
      if (!searchText) return contacts;
      return contacts.filter((contact) =>
        `${contact.firstName} ${contact.lastName}`
          .toLowerCase()
          .includes(searchText.toLowerCase())
      );
    })
  );

  ngOnInit(): void {
    this.store.dispatch(loadContacts());
  }

  toggleSort(): void {
    this.sortAscending = !this.sortAscending;
    this.filteredContacts$ = this.filteredContacts$.pipe(
      map((contacts) =>
        [...contacts].sort((a, b) =>
          this.sortAscending
            ? a.firstName.localeCompare(b.firstName)
            : b.firstName.localeCompare(a.firstName)
        )
      )
    );
  }
}
