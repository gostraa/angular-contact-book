import { NgFor } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-contact-list",
  imports: [NgFor, FormsModule],
  templateUrl: "./contact-list.component.html",
  styleUrl: "./contact-list.component.scss",
})
export class ContactListComponent {
  searchText = "";

  contacts = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      phone: "+380123456789",
      email: "john.doe@example.com",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      phone: "+380987654321",
      email: "jane.smith@example.com",
    },
    {
      id: 3,
      firstName: "Mike",
      lastName: "Jordan",
      phone: "+380112233445",
      email: "mike.jordan@example.com",
    },
  ];

  filteredContacts() {
    if (!this.searchText) {
      return this.contacts;
    }
    return this.contacts.filter((contact) =>
      `${contact.firstName} ${contact.lastName}`
        .toLowerCase()
        .includes(this.searchText.toLowerCase())
    );
  }

  sortContacts() {
    this.contacts = this.contacts.sort((a, b) => {
      const nameA = `${a.firstName}`.toLowerCase();
      const nameB = `${b.firstName}`.toLowerCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  }

  editContact(contact: any) {
    console.log("Редактирование контакта:", contact);
  }

  deleteContact(id: number) {
    this.contacts = this.contacts.filter((contact) => contact.id !== id);
  }
}
