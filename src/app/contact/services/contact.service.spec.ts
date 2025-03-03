import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { ContactService } from "./contact.service";
import { MatSnackBar } from "@angular/material/snack-bar";

import { Contact } from "../contact.model";

describe("ContactService", () => {
  let service: ContactService;
  let httpMock: HttpTestingController;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  const mockContact: Contact = {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    phone: "1234567890",
    email: "johndoe@gmail.com",
  };

  beforeEach(() => {
    snackBar = jasmine.createSpyObj("MatSnackBar", ["open"]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContactService, { provide: MatSnackBar, useValue: snackBar }],
    });

    service = TestBed.inject(ContactService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("getContacts()", () => {
    it("should retrieve all contacts successfully", () => {
      const mockContacts: Contact[] = [
        {
          id: "1",
          firstName: "John",
          lastName: "Doe",
          phone: "1234567890",
          email: "johndoe@gmail.com",
        },
        {
          id: "2",
          firstName: "Jane",
          lastName: "Smith",
          phone: "0987654321",
          email: "johndoe@gmail.com",
        },
      ];

      service.getContacts().subscribe((contacts) => {
        expect(contacts.length).toBe(2);
        expect(contacts).toEqual(mockContacts);
      });

      const req = httpMock.expectOne("http://localhost:3000/api/contacts/");
      expect(req.request.method).toBe("GET");
      req.flush(mockContacts);
    });
  });

  describe("getContactById()", () => {
    it("should retrieve a contact by ID successfully", () => {
      service.getContactById(mockContact.id).subscribe((contact) => {
        expect(contact).toEqual(mockContact);
      });

      const req = httpMock.expectOne(
        `http://localhost:3000/api/contacts/${mockContact.id}`
      );
      expect(req.request.method).toBe("GET");
      req.flush(mockContact);
    });
  });

  describe("addContact()", () => {
    it("should add a contact successfully", () => {
      service.addContact(mockContact).subscribe((response) => {
        expect(response).toEqual(mockContact);
      });

      const req = httpMock.expectOne("http://localhost:3000/api/contacts/");
      expect(req.request.method).toBe("POST");
      req.flush(mockContact);
    });
  });

  describe("updateContact()", () => {
    it("should update a contact successfully", () => {
      service.updateContact(mockContact).subscribe((response) => {
        expect(response).toEqual(mockContact);
      });

      const req = httpMock.expectOne(
        `http://localhost:3000/api/contacts/${mockContact.id}`
      );
      expect(req.request.method).toBe("PUT");
      req.flush(mockContact);
    });
  });

  describe("deleteContact()", () => {
    it("should delete a contact successfully", () => {
      service.deleteContact(mockContact.id).subscribe((response) => {
        expect(response.id).toBe(mockContact.id);
      });

      const req = httpMock.expectOne(
        `http://localhost:3000/api/contacts/${mockContact.id}`
      );
      expect(req.request.method).toBe("DELETE");
      req.flush({ id: mockContact.id });
    });
  });
});
