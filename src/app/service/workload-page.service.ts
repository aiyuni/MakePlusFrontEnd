import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';
import { WorkloadPageItem } from '../classes/workLoadPageItem';
import { tap, catchError } from 'rxjs/operators';
import { frontEndTestMode, apiURL } from 'src/environments/environment';

/** roots */
@Injectable({
  providedIn: 'root'
})
export class WorkloadPageService {

  /** The url for the workload table */
  private url = '';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { 
    this.url = apiURL.baseURL + '/MiddleLevelPage'
  }
  /** headers in an httpOptions object that will be passed to every HttpClient save method. */
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** GET: get all workload array from database */
  getAllWorkloadItems(): Observable<WorkloadPageItem[]> {
    return this.http.get<WorkloadPageItem[]>(this.url).pipe(
      tap(_ => this.log(`fetched all workloads`)),
      catchError(this.handleError<WorkloadPageItem[]>(`fetched all workloads failed`))
    );
  };

  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
