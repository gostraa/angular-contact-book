import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ContactEditComponent } from "./contact-edit.component";
import { Store } from "@ngrx/store";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { provideMockStore } from "@ngrx/store/testing";
import { HttpClient } from "@angular/common/http";
import { ContactService } from "../../contact/services/contact.service";
import { of } from "rxjs";
import { UuidService } from "../../contact/services/uuid.service";
import { updateContact } from "../../contact/actions/contact.actions";

describe("ContactEditComponent", () => {
  let component: ContactEditComponent;
  let fixture: ComponentFixture<ContactEditComponent>;
  let store: Store;
  let routerSpy: jasmine.SpyObj<Router>;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;
  let http: HttpClient;
  let contactServiceSpy: jasmine.SpyObj<ContactService>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj("Router", ["navigate"]);

    activatedRouteSpy = jasmine.createSpyObj("ActivatedRoute", [], {
      snapshot: {
        paramMap: {
          get: () => "some-id",
        },
      },
    });

    http = jasmine.createSpyObj("HttpClient", ["get", "post", "put", "delete"]);

    contactServiceSpy = jasmine.createSpyObj("ContactService", [
      "getContactById",
    ]);

    contactServiceSpy.getContactById.and.returnValue(
      of({
        id: "some-id",
        firstName: "John",
        lastName: "Doe",
        phone: "1234567890",
        email: "john.doe@example.com",
      })
    );
    await TestBed.configureTestingModule({
      imports: [
        ContactEditComponent,
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
      ],
      providers: [
        provideMockStore(),
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        { provide: HttpClient, useValue: http },
        { provide: ContactService, useValue: contactServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactEditComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should load the contact data on init", () => {
    expect(contactServiceSpy.getContactById).toHaveBeenCalledWith("some-id");
    expect(component.editForm.value).toEqual({
      firstName: "John",
      lastName: "Doe",
      phone: "1234567890",
      email: "john.doe@example.com",
    });
  });

  it("should fill the form with contact data on load", () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.editForm.value).toEqual({
      firstName: "John",
      lastName: "Doe",
      phone: "1234567890",
      email: "john.doe@example.com",
    });
  });

  it("should dispatch updateContact action on form submit", () => {
    const mockContact = {
      firstName: "John",
      lastName: "Doe",
      phone: "1234567890",
      email: "john.doe@example.com",
    };
    component.editForm.setValue(mockContact);

    spyOn(store, "dispatch");

    component.onSubmit();
    expect(store.dispatch).toHaveBeenCalledWith(
      updateContact({
        contact: {
          id: "some-id",
          firstName: "John",
          lastName: "Doe",
          phone: "1234567890",
          email: "john.doe@example.com",
        },
      })
    );
  });

  it("should navigate to /contacts after submitting the form", () => {
    component.editForm.setValue({
      firstName: "John",
      lastName: "Doe",
      phone: "1234567890",
      email: "john.doe@example.com",
    });
    component.onSubmit();

    expect(routerSpy.navigate).toHaveBeenCalledWith(["/contacts"]);
  });
});
