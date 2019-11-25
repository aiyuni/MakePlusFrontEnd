import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { Employee } from '../classes/employee';
import { frontEndTestMode } from 'src/environments/environment';
import { NextID } from '../classes/nextID';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class EmployeeListService {

  /** Test api call by using local sampleJson.json */
  private url;
  private urlNextEmplyeeID;
   

  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization':  'my-auth-token'
     })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { 
    this.url = 'https://localhost:44307/api/employeepage';    // .net api calls
    this.urlNextEmplyeeID = 'https://localhost:44307/api/EmployeePage/nextEmployeeId';           // Perry's url goes here.
    if(frontEndTestMode.forntEndTestMode){
      this.url = 'http://localhost:3000/employees';             // myJJSONfile fake api calls. 
      this.urlNextEmplyeeID = ' https://localhost:44307/api/EmployeePage/nextEmployeeId';
    }
  }

  getAllEmployees(): Observable<Employee[]> {
    console.log(`frontEndTestMode=${frontEndTestMode.forntEndTestMode}`);
    return this.http.get<Employee[]>(this.url).pipe(
      tap(_ => this.log(`fetched project id`)),
      catchError(this.handleError<Employee[]>(`getProject id`))
    );
  };

  /** POST: add a new hero to the database */
  postEmployee (employee: Employee): Observable<Employee> {
    console.log("POST Sucessful");
    console.log(JSON.stringify(employee));
    return this.http.post<Employee>(this.url, employee, this.httpOptions)
  .pipe(
    catchError(this.handleError('postProject', employee))
  );
}

getTotalEmployeeID(): Observable<NextID> {
  return this.http.get<NextID>(this.urlNextEmplyeeID).pipe(  
    tap(_ => this.log(`fetched getTotalEmployeeID`)),
    catchError(this.handleError<NextID>(`getTotalEmployeeID`))
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
