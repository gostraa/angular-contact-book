import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from "@angular/core";
import { Store } from "@ngrx/store";
import {
  selectAllContacts,
  selectContactsLoaded,
  selectError,
} from "../../contact/selectors/contact.selectors";
import {
  deleteContact,
  loadContacts,
} from "../../contact/actions/contact.actions";
import { Contact } from "../../contact/contact.model";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  filter,
  Observable,
  startWith,
  Subject,
  takeUntil,
  tap,
} from "rxjs";
import { FullNamePipe } from "../../pipes/full-name.pipe";
import { PhoneFormatPipe } from "../../pipes/phone-format.pipe";
import { RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ContactState } from "../../contact/reducers/contact.reducer";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
@Component({
  selector: "app-contact-list",
  templateUrl: "./contact-list-page.component.html",
  styleUrls: ["./contact-list-page.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FullNamePipe,
    PhoneFormatPipe,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    RouterModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactListComponent {
  private store = inject(Store<ContactState>);
  private sortAscending: boolean = false;
  private searchText$ = new BehaviorSubject<string>("");

  contacts$!: Observable<Contact[]>;
  error$!: Observable<any>;

  searchText: string = "";
  dataSource = new MatTableDataSource<Contact>([]);
  displayedColumns: string[] = ["Name", "Phone", "Email", "Actions"];

  constructor() {
    this.contacts$ = this.store.select(selectAllContacts);
    this.error$ = this.store.select(selectError);
    this.store
      .select(selectContactsLoaded)
      .pipe(
        filter((loaded) => !loaded),
        tap(() => this.store.dispatch(loadContacts())),
        takeUntilDestroyed()
      )
      .subscribe();

    combineLatest([
      this.contacts$,
      this.searchText$.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        startWith("")
      ),
    ])
      .pipe(takeUntilDestroyed())
      .subscribe(([contacts, searchText]) => {
        this.dataSource.data = contacts;

        this.dataSource.filterPredicate = (
          contact: Contact,
          filter: string
        ) => {
          if (!filter) return true;
          return `${contact.firstName} ${contact.lastName}`
            .toLowerCase()
            .includes(filter.toLowerCase());
        };

        this.dataSource.filter = searchText;
      });
  }

  deleteContact(id: string) {
    this.store.dispatch(deleteContact({ id }));
  }

  filterContacts(contacts: Contact[] | null): Contact[] {
    if (!contacts) return [];
    if (!this.searchText) return contacts;
    return contacts.filter((contact) =>
      `${contact.firstName} ${contact.lastName}`
        .toLowerCase()
        .includes(this.searchText.toLowerCase())
    );
  }

  toggleSort(): void {
    this.sortAscending = !this.sortAscending;
    this.dataSource.data = [...this.dataSource.data].sort((a, b) =>
      this.sortAscending
        ? a.firstName.localeCompare(b.firstName)
        : b.firstName.localeCompare(a.firstName)
    );
  }
  searchTextChanged(text: string): void {
    this.searchText$.next(text);
  }
}
