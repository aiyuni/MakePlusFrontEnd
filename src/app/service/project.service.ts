import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

import { Project } from '../classes/project';
import { frontEndTestMode } from 'src/environments/environment';
import { NextID } from '../classes/nextID';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    emptyJSON = `{"employeeSalaryList":[],"ID":1,"Name":"","desc":"","salaryBudget":0,"totalInvoice":0,"materialBudget":0,"spendToDate":0,"startDate":null,"endDate":null,"completion":0,"businessCode":"NA","costMultiplier":1,"isProposal":false,"isUnderISO13485":false,"recoredStoredCompleted":0,"progressSurveyRsult":false,"progressSurveySent":false,"followupSurveySent":false,"followupSurveyResult":false,"lead":[],"member":[],"phaseArr":[],"workloadArr":[],"invoiceArr":[],"material":[]}`;
    private projectUrl = 'api/project';  // URL to web api
    
    /** Test api call by using local sampleJson.json */
    private url;
    private urlNextProjectID;
    private urlNextPhaseID;

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        private http: HttpClient,
        private messageService: MessageService) 
        {
            this.url = 'https://localhost:44307/api/individualprojectpages/';   // TODO: Perry's url goes here.
            this.urlNextProjectID = 'https://localhost:44307/api/HighLevelPage/nextProjectId'                           // TODO: Perry's url goes here.
            this.urlNextPhaseID = 'https://localhost:44307/api/HighLevelPage/nextPhaseId'                             // TODO: Perry's url goes here.
            if(frontEndTestMode.forntEndTestMode){
              this.url = 'http://localhost:3000/singleProject';
              this.urlNextProjectID = 'http://localhost:3000/totalProjectID'
              this.urlNextPhaseID = 'http://localhost:3000/totalPhaseID'                                    
            }
         };
    
    getTotalProjectID(): Observable<NextID> {
        // return of(Math.floor(Math.random() * 10000) + 100);
        return this.http.get<NextID>(this.urlNextProjectID).pipe(  
            tap(_ => this.log(`fetched getTotalProjectID`)),
            catchError(this.handleError<NextID>(`getTotalProjectID`))
         );
      };

    getTotalPhaseID(): Observable<NextID> {
        return this.http.get<NextID>(this.urlNextPhaseID).pipe(  
            tap(_ => this.log(`fetched getTotalPhaseID`)),
            catchError(this.handleError<NextID>(`getTotalPhaseID`))
         );
      };

    getEmptyProject(){
        let project = JSON.parse(this.emptyJSON);
        return of(project);
    }

    getProject(id: number): Observable<Project> {
        let url = this.url;
        if(!frontEndTestMode.forntEndTestMode)
            url = url + id;
        return this.http.get<Project>(url).pipe(  
           tap(_ => this.log(`fetched project id=${id}`)),
           catchError(this.handleError<Project>(`getProject id=${id}`))
        );
    };

    /** POST: add a new Project to the database */
    postProject (project: Project): Observable<Project> {
        let url = this.url;
        if(!frontEndTestMode)
            url = 'http://localhost:3000/singleProjectPost';
        return this.http.post<Project>(this.url, project, this.httpOptions)
      .pipe(
        catchError(this.handleError('postProject', project))
      );
    }


    /** GET hero by id. Return `undefined` when id not found */
    getHeroNo404<Data>(id: number): Observable<Project> {
        const url = `${this.projectUrl}/?id=${id}`;
        return this.http.get<Project[]>(url)
            .pipe(
                map(Project => Project[0]), // returns a {0|1} element array
                tap(h => {
                    const outcome = h ? `fetched` : `did not find`;
                    this.log(`${outcome} Project id=${id}`);
                }),
                catchError(this.handleError<Project>(`getProject id=${id}`))
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

    /** Log a ProjectService message with the MessageService */
    private log(message: string) {
        this.messageService.add(`HeroService: ${message}`);
    }
}