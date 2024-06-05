import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements OnInit {
  constructor(private http: HttpClient) {}
  public data: any[] | undefined;

  ngOnInit(): void {
    this.info().subscribe((ele) => {
      const obj = ele.data.versions;
      const arr = [];
      for (let key in obj) {
        arr.push({ key: key, value: obj[key] });
      }

      this.data = arr;
    });
  }

  info(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<any>(
        'https://townhall-ten.vercel.app/info',
        { name: 'roboticdb' },
        { headers }
      )
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }
}
