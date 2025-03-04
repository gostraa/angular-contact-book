import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ContactListComponent } from "./contact-list-page.component";
import { provideMockStore, MockStore } from "@ngrx/store/testing";
import {
  selectAllContacts,
  selectError,
} from "../../contact/selectors/contact.selectors";
import {
  loadContacts,
  deleteContact,
} from "../../contact/actions/contact.actions";
import { Router } from "@angular/router";
import { Contact } from "../../contact/contact.model";
import { By } from "@angular/platform-browser";
import { MatButtonModule } from "@angular/material/button";

describe("ContactListComponent", () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;
  let store: MockStore;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockContacts: Contact[] = [
    {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      phone: "123456789",
      email: "john@example.com",
    },
    {
      id: "2",
      firstName: "Jane",
      lastName: "Smith",
      phone: "987654321",
      email: "jane@example.com",
    },
  ];

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj("Router", ["navigate"]);

    await TestBed.configureTestingModule({
      imports: [ContactListComponent, MatButtonModule],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectAllContacts, value: mockContacts },
            { selector: selectError, value: null },
          ],
        }),
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should load contacts on initialization", () => {
    spyOn(store, "dispatch");

    component.ngOnInit();

    expect(store.dispatch).toHaveBeenCalledWith(loadContacts());
  });

  it("should display contacts", async () => {
    store.overrideSelector(selectAllContacts, mockContacts);
    store.refreshState();
    await fixture.whenStable();
    fixture.detectChanges();
    const rows = fixture.debugElement.queryAll(By.css("mat-row"));
    expect(rows.length).toBe(mockContacts.length);
  });

  it("should filter contacts", () => {
    component.searchText = "Jane";
    const filtered = component.filterContacts(mockContacts);
    expect(filtered.length).toBe(1);
    expect(filtered[0].firstName).toBe("Jane");
  });

  it("should sort contacts", () => {
    component.toggleSort();
    component.contacts$.subscribe((sortedContacts) => {
      expect(sortedContacts[0].firstName).toBe("Jane");
    });
  });

  it("should dispatch delete contact action", () => {
    spyOn(store, "dispatch");

    component.deleteContact("1");

    expect(store.dispatch).toHaveBeenCalledWith(deleteContact({ id: "1" }));
  });

  it("should navigate to edit contact page", () => {
    component.goToEditContact("1");

    expect(routerSpy.navigate).toHaveBeenCalledWith(["/contacts/edit", "1"]);
  });

  it("should navigate to add contact page", () => {
    component.goToAddContact();

    expect(routerSpy.navigate).toHaveBeenCalledWith(["/contacts/add"]);
  });
});
