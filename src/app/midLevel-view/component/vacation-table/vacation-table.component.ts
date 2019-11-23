import { Component, OnInit, Input } from '@angular/core';
import { WorkloadPageItem } from 'src/app/classes/workLoadPageItem';
import { ActivatedRoute } from '@angular/router';
import { WorkloadPageService } from 'src/app/service/workload-page.service';
import { EmployeeListService } from 'src/app/service/employee-list.service';
import { EmployeeSalary } from 'src/app/classes/employeeSalary';
import { Employee } from 'src/app/classes/employee';
import { SelectItem } from 'primeng/components/common/selectitem';
import { VacationService } from 'src/app/service/vacation.service';
import { VacationPageItem } from 'src/app/classes/vacationPageItem';


@Component({
  selector: 'app-vacation-table',
  templateUrl: './vacation-table.component.html',
  styleUrls: ['./vacation-table.component.css']
})
export class VacationTableComponent implements OnInit {

  cols: any[];
  vacationArr:VacationPageItem[];
  @Input()  employeesSelectItems:SelectItem[];
  @Input()  months:Date[];

  constructor(
    private vacationService: VacationService,
  ) { }

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
  getVacationArr(): void {
    this.vacationService.getVacationArr()
      .subscribe(v => {
        this.vacationArr = v;
        console.log("all vacation api get response");
        console.log(JSON.stringify(this.vacationArr));
      });
  }

}
