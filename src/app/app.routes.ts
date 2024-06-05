import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
  {
    component: AuthComponent,
    path: '',
    children: [{ component: ContactComponent, path: 'contact' }],
  },
];
