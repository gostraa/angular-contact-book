import { TestBed } from "@angular/core/testing";
import { provideStore } from "@ngrx/store";
import { Store } from "@ngrx/store";
import { ContactListComponent } from "./contact-list.component";
import { contactReducer } from "../../store/redusers/contact.reducer";

describe("ContactListComponent", () => {
  let component: ContactListComponent;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideStore({ contacts: contactReducer })],
    });
    store = TestBed.inject(Store);
    component = TestBed.createComponent(ContactListComponent).componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
