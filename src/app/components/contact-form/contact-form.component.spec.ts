import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ContactFormComponent } from "./contact-form.component";
import { provideMockStore } from "@ngrx/store/testing";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from "@angular/material/card";
import { addContact } from "../../contact/actions/contact.actions";
import { v4 as uuidv4 } from "uuid";
import { UuidService } from "../../contact/services/uuid.service";

describe("ContactFormComponent", () => {
  let component: ContactFormComponent;
  let fixture: ComponentFixture<ContactFormComponent>;
  let store: Store;
  let routerSpy: jasmine.SpyObj<Router>;
  let uuidServiceMock: jasmine.SpyObj<UuidService>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj("Router", ["navigate"]);
    uuidServiceMock = jasmine.createSpyObj("UuidService", ["v4"]);
    await TestBed.configureTestingModule({
      imports: [
        ContactFormComponent,
        ReactiveFormsModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        MatCardModule,
        MatSnackBarModule,
      ],
      providers: [
        provideMockStore(),
        { provide: Router, useValue: routerSpy },
        { provide: UuidService, useValue: uuidServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactFormComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should dispatch addContact action on form submit", () => {
    const mockContact = {
      firstName: "John",
      lastName: "Doe",
      phone: "1234567890",
      email: "john.doe@example.com",
    };
    component.contactForm.setValue(mockContact);

    const mockedUuid = "mockedUuid";
    uuidServiceMock.v4.and.returnValue(mockedUuid);

    spyOn(store, "dispatch");

    component.onSubmit();
    expect(store.dispatch).toHaveBeenCalledWith(
      addContact({
        contact: {
          id: mockedUuid,
          ...mockContact,
        },
      })
    );
  });

  it("should navigate to /contacts after submitting the form", () => {
    component.contactForm.setValue({
      firstName: "John",
      lastName: "Doe",
      phone: "1234567890",
      email: "john.doe@example.com",
    });
    component.onSubmit();

    expect(routerSpy.navigate).toHaveBeenCalledWith(["/contacts"]);
  });

  it("should navigate back to /contacts when goBack is called", () => {
    component.goBack();

    expect(routerSpy.navigate).toHaveBeenCalledWith(["/contacts"]);
  });

  it("should have a valid form when required fields are filled", () => {
    component.contactForm.setValue({
      firstName: "John",
      lastName: "Doe",
      phone: "1234567890",
      email: "john.doe@example.com",
    });

    expect(component.contactForm.valid).toBeTrue();
  });

  it("should have an invalid form when required fields are not filled", () => {
    component.contactForm.setValue({
      firstName: "",
      lastName: "Doe",
      phone: "1234567890",
      email: "john.doe@example.com",
    });

    expect(component.contactForm.invalid).toBeTrue();
  });
});
