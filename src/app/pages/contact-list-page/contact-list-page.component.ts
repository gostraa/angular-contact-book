import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from "@angular/core";
import { Store } from "@ngrx/store";
import {
  selectAllContacts,
  selectError,
} from "../../contact/selectors/contact.selectors";
import {
  deleteContact,
  loadContacts,
} from "../../contact/actions/contact.actions";
import { Contact } from "../../contact/contact.model";
import { AsyncPipe, CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { map, Observable } from "rxjs";
import { FullNamePipe } from "../../pipes/full-name.pipe";
import { PhoneFormatPipe } from "../../pipes/phone-format.pipe";
import { Router, RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ContactState } from "../../contact/reducers/contact.reducer";
@Component({
  selector: "app-contact-list",
  templateUrl: "./contact-list-page.component.html",
  styleUrls: ["./contact-list-page.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AsyncPipe,
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
export class ContactListComponent implements OnInit {
  private store = inject(Store<ContactState>);
  private sortAscending: boolean = false;

  contacts$!: Observable<Contact[]>;
  error$!: Observable<any>;
  searchText: string = "";
  displayedColumns: string[] = ["Name", "Phone", "Email", "Actions"];

  ngOnInit(): void {
    this.contacts$ = this.store.select(selectAllContacts);
    this.error$ = this.store.select(selectError);
    this.store.dispatch(loadContacts());
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
    this.contacts$ = this.contacts$.pipe(
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
