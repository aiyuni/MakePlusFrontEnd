import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

import { Project } from '../classes/project';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    emptyJSON = `{"employeeSalaryList":[],"ID":1,"Name":"","desc":"","salaryBudget":0,"totalInvoice":0,"materialBudget":0,"spendToDate":0,"startDate":null,"endDate":null,"completion":null,"businessCode":"NA","costMultiplier":null,"isProposal":false,"isUnderISO13485":false,"recoredStoredCompleted":null,"progressSurveyRsult":false,"progressSurveySent":false,"followupSurveySent":false,"followupSurveyResult":false,"lead":[],"member":[],"phaseArr":[],"workloadArr":[],"invoiceArr":[],"material":[]}`;

    private projectUrl = 'api/project';  // URL to web api
    
    /** Test api call by using local sampleJson.json */
    private url = 'https://localhost:44307/api/individualprojectpages/1';

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        private http: HttpClient,
        private messageService: MessageService) { };
    
    getNextProjectID(): Observable<number> {
        return of(Math.floor(Math.random() * 10000) + 100);
      };

    getNextPhaseID(): Observable<number> {
        return of(Math.floor(Math.random() * 10000) + 100);
      };

    getEmptyProject(){
        let project = JSON.parse(this.emptyJSON);
        console.log("empty project");
        console.log(project);
        return of(project);
    }

    getProject(id: number): Observable<Project> {
       //const url = `${this.projectUrl}/${id}`;
           return this.http.get<Project>("https://localhost:44307/api/individualprojectpages/" + id).pipe(  
               tap(_ => this.log(`fetched project id=${id}`)),
              catchError(this.handleError<Project>(`getProject id=${id}`))
           );

          return this.http.get<Project>(this.url).pipe(
              tap(_ => this.log(`fetched project id`)),
              catchError(this.handleError<Project>(`getProject id`))
          );

        // return this.http.get<Project>(this.url)
        //   .pipe(map((response: any) => new Project(response.json())));
    };

    /** POST: add a new hero to the database */
    postProject (project: Project): Observable<Project> {
        console.log("POST Sucessful");
        console.log(JSON.stringify(project));
        return this.http.post<Project>("https://localhost:44307/api/individualprojectpages/", project, this.httpOptions)
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

    /** Log a HeroService message with the MessageService */
    private log(message: string) {
        this.messageService.add(`HeroService: ${message}`);
    }

    //   /** GET heroes from the server */
    //   getHeroes (): Observable<Hero[]> {
    //     return this.http.get<Hero[]>(this.heroesUrl)
    //       .pipe(
    //         tap(_ => this.log('fetched heroes')),
    //         catchError(this.handleError<Hero[]>('getHeroes', []))
    //       );
    //   }

    //   /** GET hero by id. Return `undefined` when id not found */
    //   getHeroNo404<Data>(id: number): Observable<Hero> {
    //     const url = `${this.heroesUrl}/?id=${id}`;
    //     return this.http.get<Hero[]>(url)
    //       .pipe(
    //         map(heroes => heroes[0]), // returns a {0|1} element array
    //         tap(h => {
    //           const outcome = h ? `fetched` : `did not find`;
    //           this.log(`${outcome} hero id=${id}`);
    //         }),
    //         catchError(this.handleError<Hero>(`getHero id=${id}`))
    //       );
    //   }

    //   /** GET hero by id. Will 404 if id not found */
    //   getHero(id: number): Observable<Hero> {
    //     const url = `${this.heroesUrl}/${id}`;
    //     return this.http.get<Hero>(url).pipe(
    //       tap(_ => this.log(`fetched hero id=${id}`)),
    //       catchError(this.handleError<Hero>(`getHero id=${id}`))
    //     );
    //   }

    //   /* GET heroes whose name contains search term */
    //   searchHeroes(term: string): Observable<Hero[]> {
    //     if (!term.trim()) {
    //       // if not search term, return empty hero array.
    //       return of([]);
    //     }
    //     return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
    //       tap(_ => this.log(`found heroes matching "${term}"`)),
    //       catchError(this.handleError<Hero[]>('searchHeroes', []))
    //     );
    //   }

    //   //////// Save methods //////////

    //   /** POST: add a new hero to the server */
    //   addHero (hero: Hero): Observable<Hero> {
    //     return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
    //       tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
    //       catchError(this.handleError<Hero>('addHero'))
    //     );
    //   }

    //   /** DELETE: delete the hero from the server */
    //   deleteHero (hero: Hero | number): Observable<Hero> {
    //     const id = typeof hero === 'number' ? hero : hero.id;
    //     const url = `${this.heroesUrl}/${id}`;

    //     return this.http.delete<Hero>(url, this.httpOptions).pipe(
    //       tap(_ => this.log(`deleted hero id=${id}`)),
    //       catchError(this.handleError<Hero>('deleteHero'))
    //     );
    //   }

    //   /** PUT: update the hero on the server */
    //   updateHero (hero: Hero): Observable<any> {
    //     return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
    //       tap(_ => this.log(`updated hero id=${hero.id}`)),
    //       catchError(this.handleError<any>('updateHero'))
    //     );
    //   }

    //   /**
    //    * Handle Http operation that failed.
    //    * Let the app continue.
    //    * @param operation - name of the operation that failed
    //    * @param result - optional value to return as the observable result
    //    */
    //   private handleError<T> (operation = 'operation', result?: T) {
    //     return (error: any): Observable<T> => {

    //       // TODO: send the error to remote logging infrastructure
    //       console.error(error); // log to console instead

    //       // TODO: better job of transforming error for user consumption
    //       this.log(`${operation} failed: ${error.message}`);

    //       // Let the app keep running by returning an empty result.
    //       return of(result as T);
    //     };
    //   }

    //   /** Log a HeroService message with the MessageService */
    //   private log(message: string) {
    //     this.messageService.add(`HeroService: ${message}`);
    //   }


    // private createDummyProject(id: number) {
    //     var p = new Project();
    //     p.ID = id;
    //     p.Name = "ISSP Project";
    //     p.desc = `Web Application for project management. The clients will be able to view/edit ongoing and past projects in both high level and low level details such as but not limited to final budget of the project, completion timeline, and individual project members’ invested hours respectively.`;
    //     p.salaryBudget = Math.floor(Math.random() * 10000) + 1;
    //     p.totalInvoice = Math.floor(Math.random() * 10000) + 1;
    //     p.materialBudget = Math.floor(Math.random() * 10000) + 1;
    //     p.spendToDate = Math.floor(Math.random() * 10000) + 1;
    //     p.startDate = new Date(2019, 11, 26);
    //     p.endDate = new Date(2019, 11, 31);
    //     p.completion = Math.floor(Math.random() * 100) + 1;
        
    //     p.businessCode = "NA";
    //     p.costMultiplier = 1.75;
    //     p.isProposal = false;
    //     p.isUnderISO13485 = false;

    //     p.recoredStoredCompleted = Math.floor(Math.random() * 100) + 1;
    //     p.progressSurveyRsult = true;
    //     p.progressSurveySent = true;
    //     p.followupSurveySent = true;
    //     p.followupSurveyResult = false;

    //     p.lead = [
    //         new Employee(1, "Peter Ahn", 100),
    //     ];
    //     p.member = [
    //         new Employee(2, "Reneil Pascua", 100),
    //         new Employee(3, "Perry Li", 200),
    //     ];

    //     p.phaseArr = [
    //         new PhaseItem(1, "consulting", new Date(2019, 10, 16), new Date(2019, 10, 30),20,25,"High impact"),
    //         new PhaseItem(2, "Requirements", new Date(2019, 10, 31), new Date(2019, 11, 5),20,25,"High impact"),
    //         new PhaseItem(3, "Concept", new Date(2019, 11, 6), new Date(2019, 11, 21),20,25,"High impact"),
    //         new PhaseItem(4, "Detailed Design", new Date(2019, 11, 22), new Date(2019, 12, 10),20,25,"High impact"),
    //         new PhaseItem(5, "Fabrication", new Date(2019, 12, 10), new Date(2019, 12, 20),20,25,"High impact"),
    //         new PhaseItem(6, "Evaluation/ user study", new Date(2019, 12, 21), new Date(2019, 12, 31),20,25,"High impact"),
    //         new PhaseItem(7, "Reporting", new Date(2020, 1, 1), new Date(2020, 1, 10),20,25,"High impact"),
    //         new PhaseItem(8, "Validation", new Date(2020, 1, 11), new Date(2020, 1, 15),20,25,"High impact"),
    //     ];

    //     p.workloadArr = [
    //         new WorkloadItem(1, "Peter", 0, 0, 23, 31, 5, 6),
    //         new WorkloadItem(2, "Reneil", 12, 3, 0, 0, 0, 0)];

    //     p.invoiceArr = [
    //         new InvoiceItem(Math.floor(Math.random() * 1000) + 101, new Date(2019, 11, 2)),
    //         new InvoiceItem(Math.floor(Math.random() * 1000) + 101, new Date(2019, 11, 12)),
    //         new InvoiceItem(Math.floor(Math.random() * 1000) + 101, new Date(2019, 11, 22)),
    //     ];

    //     p.material = [
    //         new MaterialItem(1, "consulting", 100, 200, "over $100"),
    //         new MaterialItem(2, "Requirements", 100, 200, "over $100"),
    //         new MaterialItem(3, "Concept", 100, 200, "over $100"),
    //         new MaterialItem(4, "Detailed Design", 100, 200, "over $100"),
    //         new MaterialItem(5, "Fabrication", 100, 200, "over $100"),
    //         new MaterialItem(6, "Evaluation/ user study", 100, 200, "over $100"),
    //         new MaterialItem(7, "Reporting", 100, 200, "over $100"),
    //         new MaterialItem(8, "Validation", 100, 200, "over $100"),
    //     ];

    //     for (var i = 0; i < p.member.length; i++) {
    //         var id = p.member[i].empID;
    //         var name = p.member[i].name;
    //         let wagee = p.member[i].wage;
    //         let temp = new EmployeeSalary();
    //         temp.empID=id;
    //         temp.empName=name;
    //         temp.wage=wagee;
    //         for (var j = 0; j < p.phaseArr.length; j++) {
    //             var phaseID = p.phaseArr[j].phaseID;
    //             var phaseName = p.phaseArr[j].name;
    //             // let spi = new PhaseDetail(phaseID, 0, 0, "");
    //             temp.PhaseDetail.push(new PhaseDetail(phaseID,phaseName, 0, 0, ""));
    //         }
    //         p.employeeSalary.push(temp);
    //     }
    //     console.log("getProject(id)\n"+JSON.stringify(p));
    //     return p;
    // };

}