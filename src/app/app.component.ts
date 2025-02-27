import { Component } from "@angular/core";
import { ContactFormComponent } from "./components/contact-form/contact-form.component";
import { ContactListComponent } from "./components/contact-list/contact-list.component";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { selectAllContacts } from "./core/selectors/contact.selectors";
import { loadContacts } from "./store/actions/contact.actions";
import { Contact } from "./models/contact.model";

@Component({
  selector: "app-root",
  imports: [ContactFormComponent, ContactListComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "contacts-app";

  // contacts$: Observable<Contact[]>;

  // constructor(private store: Store) {
  //   this.contacts$ = this.store.select(selectAllContacts);

  //   this.store.dispatch(loadContacts());
  // }
}
