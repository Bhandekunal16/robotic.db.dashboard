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
  imports: [HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(private http: HttpClient) {}
  public name: string | undefined;
  public createdOn: string | undefined;
  public modifiedOn: string | undefined;
  public author: string | undefined;
  public description: string | undefined;
  public maintainers: string | undefined;
  public license: string | undefined;

  ngOnInit(): void {
    this.info().subscribe((ele) => {
      console.log(ele);
      this.name = ele.data.name;
      this.createdOn = ele.data.time.created;
      this.modifiedOn = ele.data.time.modified;
      this.author = ele.data.author.name;
      this.description = ele.data.description;
      this.maintainers = ele.data.maintainers[0].name;
      this.license = ele.data.license;
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
