import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';
import { VacationPageItem } from '../classes/vacationPageItem';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { frontEndTestMode } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VacationService {

  /** Test api call by using local sampleJson.json */
  private url ;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { 
    this.url = 'https://localhost:44307/api/vacationpage';   // TODO: Perry's url goes here.
    if(frontEndTestMode.forntEndTestMode)
      this.url = 'http://localhost:3000/allVacation';
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getVacationArr(): Observable<VacationPageItem[]> {
    return this.http.get<VacationPageItem[]>(this.url).pipe(
      tap(_ => this.log(`fetched all workloads`)),
      catchError(this.handleError<VacationPageItem[]>(`fetched all workloads failed`))
    );
  };

  /** POST: add a new Project to the database */
  postVacationArr (vactions: VacationPageItem[]): Observable<VacationPageItem[]> {
    return this.http.post<VacationPageItem[]>(this.url, vactions, this.httpOptions)
    .pipe(
      catchError(this.handleError('postProject', vactions))
    );
  }


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
