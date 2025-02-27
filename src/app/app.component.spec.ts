import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { Store } from "@ngrx/store";
import { provideStore } from "@ngrx/store";
import { ContactListComponent } from "./components/contact-list/contact-list.component";
import { ContactFormComponent } from "./components/contact-form/contact-form.component";
import { loadContacts } from "./store/actions/contact.actions";
import { selectAllContacts } from "./core/selectors/contact.selectors";
import { of } from "rxjs";
import { Contact } from "./models/contact.model";

const mockContacts: Contact[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    phone: "93924993747484",
    email: "john@example.com",
  },
];

describe("AppComponent", () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent, ContactListComponent, ContactFormComponent],
      providers: [provideStore({ contacts: () => of(mockContacts) })],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);

    store.dispatch(loadContacts());
    fixture.detectChanges();
  });

  it("should create the app", () => {
    expect(component).toBeTruthy();
  });
});
