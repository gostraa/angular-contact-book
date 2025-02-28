import { Routes } from "@angular/router";
import { ContactEditComponent } from "./components/contact-edit/contact-edit.component";
import { ContactListComponent } from "./components/contact-list/contact-list.component";
import { ContactFormComponent } from "./components/contact-form/contact-form.component";

export const routes: Routes = [
  { path: "", redirectTo: "/contacts", pathMatch: "full" },
  { path: "contacts", component: ContactListComponent },
  { path: "contacts/add", component: ContactFormComponent },
  { path: "contacts/edit/:id", component: ContactEditComponent },
];
