import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, throwError } from 'rxjs';
import { DecryptService } from '../../global/decrypt.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    MessagesModule,
    HttpClientModule,
    CommonModule,
    ButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  public myForm: FormGroup;
  public msg: Message[] | any;

  constructor(private http: HttpClient) {
    this.myForm = new FormGroup({
      email: new FormControl(''),
      message: new FormControl(''),
    });
  }

  ngOnInit(): void {}

  submit() {
    const email = this.myForm.value.email;
    const message = this.myForm.value.message;

    this.email({
      to: email,
      message: `your message received successfully.`,
    }).subscribe((ele) => {
      this.msg = [
        {
          severity: 'success',
          summary: 'success',
          detail: `your message sent successfully`,
        },
      ];
    });
    this.email({
      to: 'roboticdev07@gmail.com',
      message: `this is message : ${message}, sender : ${email}`,
    }).subscribe((ele) => {
      this.msg = [
        {
          severity: 'success',
          summary: 'success',
          detail: `your message received by us successfully`,
        },
      ];

      if (ele.success) {
        setInterval(() => {
          window.location.reload();
        }, 3000);
      }
    });
  }

  redirectToExternalURL() {
    const externalURL = 'https://github.com/Bhandekunal16/jsonDb';
    window.location.href = externalURL;
  }

  redirectToExternalURL2() {
    const externalURL = 'https://github.com/Bhandekunal16/jsonDb';
    window.location.href = externalURL;
  }

  email(body: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<any>(
        'https://mailer-service-eight.vercel.app/message/send-email',
        body,
        { headers }
      )
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }
}
