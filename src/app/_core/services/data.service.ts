import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

let urlApi = '';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {
    urlApi = environment.urlApi;
  }

  get(uri: any): Observable<any> {
    const url = `${urlApi}/${uri}`;
    return this.http.get(url).pipe(
      tap(() => { }),
      catchError((error: any) => {
        return this.handleError(error);
      })
    );
  }

  post(uri: any, data: any, options: any = {}): Observable<any> {
    const url = `${urlApi}/${uri}`;
    return this.http.post(url, data, options).pipe(
      tap(() => { }),
      catchError((error: any) => {
        return this.handleError(error);
      })
    );
  }

  put(uri: any, data: any): Observable<any> {
    const url = `${urlApi}/${uri}`;
    return this.http.put(url, data).pipe(
      tap(() => { }),
      catchError((error: any) => {
        return this.handleError(error);
      })
    );
  }

  delete(uri: any, options?: any): Observable<any> {
    const url = `${urlApi}/${uri}`;
    return this.http.delete(url, options).pipe(
      tap(() => { }),
      catchError((error: any) => {
        return this.handleError(error);
      })
    );
  }

  handleError(error: any) {
    switch (error.status) {
      case 300:
        console.log("300", error);
        break;

      case 400:
        console.log("400", error);
        break;

      case 500:
        console.log("500", error);
        break;

      default:
        console.log("default", error);
        break;
    }
    return throwError(error);
  }
}
