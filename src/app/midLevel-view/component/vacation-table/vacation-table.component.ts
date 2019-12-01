import { Component, OnInit, Input } from '@angular/core';
import { SelectItem } from 'primeng/components/common/selectitem';
import { VacationService } from 'src/app/service/vacation.service';
import { VacationPageItem } from 'src/app/classes/vacationPageItem';

/** The vacation component in MID level. */
@Component({
  selector: 'app-vacation-table',
  templateUrl: './vacation-table.component.html',
  styleUrls: ['./vacation-table.component.css']
})
export class VacationTableComponent implements OnInit {

  /** column header names */
  cols: any[];
  /** each row of vaction table */
  vacationArr:VacationPageItem[];
  /** the dropdown of employee names. */
  @Input()  employeesSelectItems:SelectItem[];
  /** the next 6 months names. */
  @Input()  months:Date[];

  constructor(
    private vacationService: VacationService,
  ) { }

  /** Initialize the directive/component. */
  ngOnInit() {
    this.vacationArr=[];
    this.cols = [
      { field: 'projectName', header: 'Project Name' },
      { field: 'empName', header: 'Research Member' },
      { field: 'month1', header: 'month1' },
      { field: 'month2', header: 'month2' },
      { field: 'month3', header: 'month3' },
      { field: 'month4', header: 'month4' },
      { field: 'month5', header: 'month5' },
      { field: 'month6', header: 'month6' },
    ];
    this.getVacationArr();
  }
  /** api calls to get vacation items */
  getVacationArr(): void {
    this.vacationService.getVacationArr()
      .subscribe(v => {
        this.vacationArr = v;
        console.log("all vacation api get response");
        console.log(JSON.stringify(this.vacationArr));
      });
  }

}
