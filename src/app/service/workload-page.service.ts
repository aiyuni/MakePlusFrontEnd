import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';
import { WorkloadPageItem } from '../classes/workLoadPageItem';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WorkloadPageService {

  /** Test api call by using local sampleJson.json */
  private url = 'http://localhost:3000/allWorkloads';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getAllWorkloadItems(): Observable<WorkloadPageItem[]> {
    return this.http.get<WorkloadPageItem[]>(this.url).pipe(
      tap(_ => this.log(`fetched all workloads`)),
      catchError(this.handleError<WorkloadPageItem[]>(`fetched all workloads failed`))
    );
  };


  // private createDummyWorkloadPageData(): WorkloadPageItem[] {
  //   let workloadPageArr = [
  //     new WorkloadPageItem(0, "ISSP", 1, "Reneil Pascua", 70, 35, 14, 0, 0, 0, 80, new Date(), false),
  //     new WorkloadPageItem(0, "ISSP", 2, "Perry Li", 98, 14, 28, 0, 0, 0, 80, new Date(), false),
  //     new WorkloadPageItem(1, "Project2", 1, "Reneil Pascua", 70, 35, 14, 0, 0, 0, 75, new Date(), false),
  //     new WorkloadPageItem(1, "Project2", 2, "Jaimie Borisoff", 12, 21, 43, 0, 0, 0, 75, new Date(), false),
  //     new WorkloadPageItem(1, "Project2", 3, "Lisa Boulton", 43, 21, 42, 0, 0, 0, 75, new Date(), false),
  //     new WorkloadPageItem(1, "Project2", 4, "Rory Dougall ", 33, 22, 11, 0, 0, 0, 75, new Date(), false),
  //     new WorkloadPageItem(9990, "Vaction", 2, "Perry Li", 0, 0, 23, 43, 1, 3, 0.0, new Date(), true),
  //     new WorkloadPageItem(9990, "Vaction", 1, "Reneil Pascua", 0, 0, 6, 32, 23, 50, 0.0, new Date(), true),
  //     new WorkloadPageItem(9990, "Vaction", 3, "Lisa Boulton", 0, 0, 3, 63, 23, 23, 0.0, new Date(), true),
  //     new WorkloadPageItem(9991, "Student", 2, "Perry Li", 0, 0, 23, 43, 1, 3, 0.0, new Date(), true),
  //     new WorkloadPageItem(9991, "Student", 1, "Reneil Pascua", 0, 0, 6, 32, 23, 50, 0.0, new Date(), true),
  //     new WorkloadPageItem(9991, "Student", 3, "Lisa Boulton", 0, 0, 3, 63, 23, 23, 0.0, new Date(), true),
  //   ];
  //   return workloadPageArr;
  // }


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
