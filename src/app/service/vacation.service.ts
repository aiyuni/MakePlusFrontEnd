import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';
import { VacationPageItem } from '../classes/vacationPageItem';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VacationService {

  /** Test api call by using local sampleJson.json */
  private url = 'http://localhost:3000/allVacation';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getVacationArr(): Observable<VacationPageItem[]> {
    return this.http.get<VacationPageItem[]>('https://localhost:44307/api/vacationpage').pipe(
      tap(_ => this.log(`fetched all workloads`)),
      catchError(this.handleError<VacationPageItem[]>(`fetched all workloads failed`))
    );
    // return of(this.createDummyVacationPageData());

    };


//  private createDummyVacationPageData(): VacationPageItem[] {
//     let workVacationArr = [
//       new VacationPageItem(1, "Reneil Pascua", 70, 35, 14, 0, 0, 0),
//       new VacationPageItem(2, "Perry Li", 98, 14, 28, 0, 0, 0),
//       new VacationPageItem(3, "Lisa Boulton", 70, 35, 14, 0, 0, 0),
//       new VacationPageItem(4, "Jaimie Borisoff", 12, 21, 43, 0, 0, 0),
//       new VacationPageItem(5, "Rory Dougall ", 33, 22, 11, 0, 0, 0),
//        ];
//     return workVacationArr;
//   }


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
