import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    component: AuthComponent,
    path: '',
    children: [
      { component: ContactComponent, path: 'contact' },
      { component: HomeComponent, path: 'home' },
    ],
  },
];
