import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';
import { WorkloadPageItem } from '../classes/workLoadPageItem';
import { tap, catchError } from 'rxjs/operators';
import { frontEndTestMode } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkloadPageService {

  /** Test api call by using local sampleJson.json */
  private url = 'http://localhost:3000/allWorkloads';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { 
    this.url = 'http://localhost:3000/allWorkloads';   // TODO: Perry's url goes here.
    if(frontEndTestMode)
      this.url = 'http://localhost:3000/allWorkloads';
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

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

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
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
