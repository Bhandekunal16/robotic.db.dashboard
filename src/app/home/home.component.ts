import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(private http: HttpClient) {}
  public name: string | undefined;
  public createdOn: string | undefined | Date | number;
  public modifiedOn: string | undefined | Date | number;
  public author: string | undefined;
  public description: string | undefined;
  public maintainers: string | undefined;
  public license: string | undefined;
  public date: any[] = [];
  public ex: string = `const match: any = new database().getByProperties( { key : "value" },'name');`;
  public ex2: string = `const match: any = brain.getByProperties( { key: "value" }, 'name' );`;

  ngOnInit(): void {
    this.info().subscribe((ele) => {
      this.name = ele.data.name?.toUpperCase();
      this.createdOn = new Date(ele.data.time.created).toDateString();
      this.modifiedOn = new Date(ele.data.time.modified).toDateString();
      this.author = ele.data.author.name;
      this.description = ele.data.description;
      this.maintainers = ele.data.maintainers[0].name;
      this.license = ele.data.license;

      const obj = ele.data.time;
      const arr = [];
      for (let key in obj) {
        arr.push({ key: key, value: obj[key] });
      }
      this.date = arr;
    });
  }

  formatDate(date: any): string {
    return new Date(date).toDateString();
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
