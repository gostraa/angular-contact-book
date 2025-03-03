import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { ContactService } from "./contact.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { of, throwError } from "rxjs";
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
    // Создаем мок для MatSnackBar
    snackBar = jasmine.createSpyObj("MatSnackBar", ["open"]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContactService, { provide: MatSnackBar, useValue: snackBar }],
    });

    service = TestBed.inject(ContactService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Убедитесь, что не осталось незакрытых HTTP-запросов
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

    it("should handle error when getting contacts", () => {
      const errorResponse = {
        status: 500,
        statusText: "Internal Server Error",
      };

      service.getContacts().subscribe({
        next: () => fail("should have failed with the 500 error"),
        error: (error) => {
          expect(error.status).toBe(500);
        },
      });

      const req = httpMock.expectOne("http://localhost:3000/api/contacts/");
      req.flush("Error", errorResponse);
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

    it("should handle error when getting contact by ID", () => {
      const errorResponse = { status: 404, statusText: "Not Found" };

      service.getContactById(mockContact.id).subscribe({
        next: () => fail("should have failed with a 404 error"),
        error: (error) => {
          expect(error.status).toBe(404);
        },
      });

      const req = httpMock.expectOne(
        `http://localhost:3000/api/contacts/${mockContact.id}`
      );
      req.flush("Error", errorResponse);
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

    it("should handle error when adding a contact", () => {
      const errorResponse = { status: 400, statusText: "Bad Request" };

      service.addContact(mockContact).subscribe({
        next: () => fail("should have failed with the 400 error"),
        error: (error) => {
          expect(error.status).toBe(400);
        },
      });

      const req = httpMock.expectOne("http://localhost:3000/api/contacts/");
      req.flush("Error", errorResponse);
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

    it("should handle error when updating a contact", () => {
      const errorResponse = { status: 400, statusText: "Bad Request" };

      service.updateContact(mockContact).subscribe({
        next: () => fail("should have failed with the 400 error"),
        error: (error) => {
          expect(error.status).toBe(400);
        },
      });

      const req = httpMock.expectOne(
        `http://localhost:3000/api/contacts/${mockContact.id}`
      );
      req.flush("Error", errorResponse);
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

    it("should handle error when deleting a contact", () => {
      const errorResponse = {
        status: 500,
        statusText: "Internal Server Error",
      };

      service.deleteContact(mockContact.id).subscribe({
        next: () => fail("should have failed with the 500 error"),
        error: (error) => {
          expect(error.status).toBe(500);
        },
      });

      const req = httpMock.expectOne(
        `http://localhost:3000/api/contacts/${mockContact.id}`
      );
      req.flush("Error", errorResponse);
    });
  });
});
