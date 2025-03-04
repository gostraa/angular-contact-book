import { Routes } from "@angular/router";
import { ContactListComponent } from "./pages/contact-list-page/contact-list-page.component";

export const routes: Routes = [
  { path: "", redirectTo: "/contacts", pathMatch: "full" },
  { path: "contacts", component: ContactListComponent },
  {
    path: "contacts/add",
    loadComponent: () =>
      import("./pages/add-contact-page/add-contact-page.component").then(
        (m) => m.ContactFormComponent
      ),
  },
  {
    path: "contacts/edit/:id",
    loadComponent: () =>
      import("./pages/edit-contact-page/edit-contact-page.component").then(
        (m) => m.ContactEditComponent
      ),
  },
];
