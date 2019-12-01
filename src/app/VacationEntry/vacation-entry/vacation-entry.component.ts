import { Component, OnInit } from '@angular/core';
import { EmployeeListService } from 'src/app/service/employee-list.service';
import { Employee } from 'src/app/classes/employee';
import { VacationPageItem } from 'src/app/classes/vacationPageItem';
import { VacationService } from 'src/app/service/vacation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vacation-entry',
  templateUrl: './vacation-entry.component.html',
  styleUrls: ['./vacation-entry.component.css']
})
export class VacationEntryComponent implements OnInit {

  /** the next 6 months names */
  months:Date[];
  /** the vacation array */
  vacationArr:VacationPageItem[];

  constructor(
    private vacationService: VacationService,
    private router: Router
  ) { }

  /** Initialize the directive/component. */
  ngOnInit() {
    this.initMonths();
    this.getVacationArr();
  }

  /** set next 6 months names based on current date. */
  private initMonths(){
    let currentM = new Date().getMonth();
    let currentY = new Date().getFullYear();
    this.months = [
      new Date(currentY,currentM),
      new Date(currentY,currentM+1),
      new Date(currentY,currentM+2),
      new Date(currentY,currentM+3),
      new Date(currentY,currentM+4),
      new Date(currentY,currentM+5)
    ]
  }

  /** get all vacation arr */
  getVacationArr(): void {
    this.vacationService.getVacationArr()
      .subscribe(v => {
        this.vacationArr = v;
        console.log("all vacation api get response");
        console.log(JSON.stringify(this.vacationArr));
      });
  }

  /** submits the vaction table */
  submit() {
    this.vacationService.postVacationArr(this.vacationArr).subscribe(     
      response=> {
        console.log("response is: " + response);
        this.router.navigate(['/workloadSummery']);
      });
  }
}
