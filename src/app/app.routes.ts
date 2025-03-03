import { Routes } from "@angular/router";
import { ContactListComponent } from "./components/contact-list/contact-list.component";

export const routes: Routes = [
  { path: "", redirectTo: "/contacts", pathMatch: "full" },
  { path: "contacts", component: ContactListComponent },
  {
    path: "contacts/add",
    loadComponent: () =>
      import("./components/contact-form/contact-form.component").then(
        (m) => m.ContactFormComponent
      ),
  },
  {
    path: "contacts/edit/:id",
    loadComponent: () =>
      import("./components/contact-edit/contact-edit.component").then(
        (m) => m.ContactEditComponent
      ),
  },
];
