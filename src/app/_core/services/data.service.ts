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
      tap(() => {}),
      catchError((error: any) => {
        return this.handleError(error);
      })
    );
  }

  post(uri: any, data: any): Observable<any> {
    const url = `${urlApi}/${uri}`;
    return this.http.post(url, data).pipe(
      tap(() => {}),
      catchError((error: any) => {
        return this.handleError(error);
      })
    );
  }

  put(uri: any, data: any): Observable<any> {
    const url = `${urlApi}/${uri}`;
    return this.http.put(url, data).pipe(
      tap(() => {}),
      catchError((error: any) => {
        return this.handleError(error);
      })
    );
  }

  delete(uri: any): Observable<any> {
    const url = `${urlApi}/${uri}`;
    return this.http.delete(url).pipe(
      tap(() => {}),
      catchError((error: any) => {
        return this.handleError(error);
      })
    );
  }

  handleError(error: any) {
    console.log("handleError", error);
    switch (error.status) {
      case 300:
        console.log('status 300');
        break;

      case 400:
        console.log('status 400');
        break;

      case 500:
        console.log('status 500');
        break;

      default:
        console.log('status other');
        break;
    }
    return throwError(error);
  }
}
