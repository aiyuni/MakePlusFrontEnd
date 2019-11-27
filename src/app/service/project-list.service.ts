import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

import { ProjectListItem } from '../classes/projectListItem';
import { ProposalListItem } from '../classes/proposalListItem';
import { frontEndTestMode, apiURL } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ProjectListService {

  /** Test api call by using local sampleJson.json */
  private url ;
  private urlProposals;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { 

    this.url = apiURL.baseURL + '/HighLevelPage/projects';
    this.urlProposals = apiURL.baseURL + '/HighLevelPage/proposals';
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getAllProjects(): Observable<ProjectListItem[]> {
    return this.http.get<ProjectListItem[]>(this.url).pipe(
      tap(_ => this.log(`fetched project id`)),
      catchError(this.handleError<ProjectListItem[]>(`getAllProjects id`))
    );
  };

  getAllProposals(): Observable<ProposalListItem[]> {
    return this.http.get<ProposalListItem[]>(this.urlProposals).pipe(
      tap(_ => this.log(`fetched project id`)),
      catchError(this.handleError<ProposalListItem[]>(`getAllProposals id`))
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
